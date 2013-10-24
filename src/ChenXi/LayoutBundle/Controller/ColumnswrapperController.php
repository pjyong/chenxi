<?php

namespace ChenXi\LayoutBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\LayoutBundle\Entity\ColumnTemplate;
use ChenXi\LayoutBundle\Entity\TemplateBox;

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
		// print_r(stripslashes($this->getRequest()->getContent()));
		$requestData = json_decode(json_decode($this->getRequest()->getContent(), true), true);


		$columns = $requestData['columns'];
		$boxes = $requestData['boxes'];
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

		// 保存所有的区块
		$templateBoxManager = $this->container->get('chenxi_template_box_manager');
		$boxTypeManager = $this->container->get('chenxi_box_type_manager');
		if(count($boxes) > 0){
			foreach($boxes as $box){
				if(isset($box['id'])){
					// 修改
					$templateBox = $templateBoxManager->find($box['id']);

				}else{
					// 添加
					$templateBox = new TemplateBox();
					$templateBox->setBoxType($boxTypeManager->find($box['boxTypeId']));
					$templateBox->setPositionId(1);
					$templateBox->setColumnTemplate($columnManager->find($box['columnTemplateId']));
				}
				$templateBoxManager->update($templateBox);
				// print 
				// 保存该区块的值
				$responseStr = $box['responseStr'];
				$boxType = $templateBox->getBoxType();
				$fullClass = 'ChenXi\LayoutBundle\BoxType\\' . $boxType->getLabel();
				$boxTypeTransform = new $fullClass($this->container->get('chenxi_box_type_manager'), $this->container->get('chenxi_box_type_property_manager'), $this->container->get('chenxi_template_box_prop_value_manager'));
				$boxTypeTransform->handleTemplateBoxForm($templateBox, $responseStr);


			}
		}
		// return $this->handleView($this->view($this->data));
		return $this->handleView($this->view(array('pageTemplateId' => $pageTemplateId)));
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