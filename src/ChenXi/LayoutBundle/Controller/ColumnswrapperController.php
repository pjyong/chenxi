<?php

namespace ChenXi\LayoutBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\LayoutBundle\Entity\ColumnTemplate;

// PageTemplate 资源


class ColumnswrapperController extends FOSRestController
{

	// 创建
	public function postColumnswrapperAction()
	{
		// print '123';
		$columns = $this->getRequest()->request->all();
		$columnManager = $this->container->get('chenxi_column_template_manager');
		// $pageTemplate = $this->container->
		if(count($columns) > 0){
			$pageTemplateId = $columns[0]['pageTemplateId'];
			$pageTemplate = $this->container->get('chenxi_page_template_manager')->find($pageTemplateId);
			// 对这些提交过来的列进行重组
			// $s['id']['parentId']
			$newColumns = array();
			foreach($columns as $key => $column){
				$id = isset($column['id']) ? $column['id'] : $column['cid'];
				$newColumns[$id] = array();
				$newColumns[$id] = $column;
			}



			foreach($columns as $key => $column){
				// 如果id没有设置那就应该添加
				if(!isset($column['id'])){


					

					// 设置返回的ID
					$columns[$key]['id'] = $columnTemplate->getId();
				}else{
					// 修改
					$columnEntity = $columnManager->find($column['id']);

				}
			}
		}
		return $this->handleView($this->view($columns));
		// $pageTemplate = new PageTemplate();
		// // 指定website
		// $website = $this->container->get('chenxi_website_manager')->find($this->getWebsiteId());
		// $pageTemplate->setWebsite($website);

		// return $this->process($pageTemplate, true);
	}

	// 保存父列，返回当前列
	public function saveColumn($column, $columns, $pageTemplate)
	{
		$parentColumnId = $column['parentColumnId'];
		if($parentColumnId != 0){
			// 得到父列
			$parentColumn = $columns[$parentColumnId]
			$this->saveColumn($parentColumn, $columns);

			$columnTemplate = new ColumnTemplate();
			$columnTemplate->setPageTemplate($pageTemplate);
			$columnTemplate->setPagePartId($column['pagePartId']);
			$columnTemplate->setColumnPartId($column['columnPartId']);
			$columnTemplate->setMinWidth($column['minWidth']);
			$columnTemplate->setMaxWidth($column['maxWidth']);
			$columnManager->update($columnTemplate);
			// $columns[]


		}
	}

}