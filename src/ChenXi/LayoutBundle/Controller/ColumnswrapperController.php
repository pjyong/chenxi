<?php

namespace ChenXi\LayoutBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\LayoutBundle\Entity\ColumnTemplate;

// PageTemplate 资源


class ColumnswrapperController extends FOSRestController
{
	// id
	public $columns = array();
	public $data = array();

	public $pageTemplate;

	// 创建
	public function postColumnswrapperAction()
	{
		// print '123';
		$columns = $this->getRequest()->request->all();
		$columnManager = $this->container->get('chenxi_column_template_manager');
		// $pageTemplate = $this->container->
		if(count($columns) > 0){
			$pageTemplateId = $columns[0]['pageTemplateId'];
			$this->pageTemplate = $this->container->get('chenxi_page_template_manager')->find($pageTemplateId);
			// 对这些提交过来的列进行重组
			// $s['id']['parentId']
			foreach($columns as $key => $column){
				$id = isset($column['id']) ? $column['id'] : $column['cid'];
				$this->columns[$id] = $column;
			}


			foreach($this->columns as $key => $column){
				// 
				if(is_object($column)){continue;}
				$this->saveColumn($column);
			}			
		}
		return $this->handleView($this->view($this->data));
	}

	// 保存父列，返回当前列
	public function saveColumn($column)
	{
		if(is_object($column)){ return $column;}
		if(!isset($column['id'])){
			// 创建
			$columnTemplate = new ColumnTemplate();
			$columnTemplate->setPageTemplate($this->pageTemplate);
			if(is_string($column['parentColumnId']) || $column['parentColumnId'] != 0){
				$parentColumn = $this->saveColumn($this->columns[$column['parentColumnId']]);
				$column['parentColumnId'] = $parentColumn->getId();
				$columnTemplate->setParentColumn($parentColumn);
			}
		}else{
			$columnTemplate = $this->container->get('chenxi_column_template_manager')->find($column['id']);
		}
		$columnTemplate->setPagePartId($column['pagePartId']);
		$columnTemplate->setColumnPartId($column['columnPartId']);
		$columnTemplate->setMinWidth($column['minWidth']);
		$columnTemplate->setMaxWidth($column['maxWidth']);
		$this->container->get('chenxi_column_template_manager')->update($columnTemplate);

		// 更新数组
		$id = isset($column['id']) ? $column['id'] : $column['cid'];
		$this->columns[$id] = $columnTemplate;
		$column['id'] = $columnTemplate->getId();
		$this->data[] = $column;

		return $columnTemplate;
	}

}