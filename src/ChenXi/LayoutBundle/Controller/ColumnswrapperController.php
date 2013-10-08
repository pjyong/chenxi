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
			foreach($columns as $key => $column){
				// 如果id没有设置那就应该添加
				if(!isset($column['id'])){
					$columnTemplate = new ColumnTemplate();
					$columnTemplate->setPageTemplate($pageTemplate);
					$columnTemplate->setPagePartId($column['pagePartId']);
					$columnTemplate->setColumnPartId($column['columnPartId']);
					$columnTemplate->setMinWidth($column['minWidth']);
					$columnTemplate->setMaxWidth($column['maxWidth']);
					$columnManager->update($columnTemplate);

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

}