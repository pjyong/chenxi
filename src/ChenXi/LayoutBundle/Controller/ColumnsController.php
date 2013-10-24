<?php

namespace ChenXi\LayoutBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\LayoutBundle\Entity\PageTemplate;
use ChenXi\LayoutBundle\Entity\ColumnTemplate;

// PageTemplate 资源


class ColumnsController extends FOSRestController
{
	// 获得
	public function getColumnsAction($pageTemplateId)
	{
		// $criteria = array('websiteId' => $this->getWebsiteId());

		$pageTemplate = $this->container->get('chenxi_page_template_manager')->find($pageTemplateId);

		$columns = $pageTemplate->getColumnTemplates();

		$data = array();
		$columnsArr = array();
		$boxesArr = array();

		foreach($columns as $column){
			$temp = array();
			$temp['id'] = $column->getId();
			$temp['pageTemplateId'] = (int)$pageTemplateId;
			$temp['pagePartId'] = $column->getPagePartId();
			$temp['columnPartId'] = $column->getColumnPartId();
			$parentColumn = $column->getParentColumn();
			$temp['parentColumnId'] = ($parentColumn == null) ? 0 : $parentColumn->getId();
			$temp['minWidth'] = $column->getMinWidth();
			$temp['maxWidth'] = $column->getMaxWidth();
			// 获得该列所有的区块
			$templateBoxes = $column->getTemplateBoxes();
			foreach($templateBoxes as $box){
				$temp2 = array();
				$temp2['id'] = $box->getId();
				$temp2['columnTemplateId'] = $column->getId();
				$temp2['cssCode'] = '';
				$temp2['boxTypeId'] = $box->getBoxType()->getId();
				$temp2['positionId'] = 1;
				$boxesArr[] = $temp2;

			}
			$columnsArr[] = $temp;
		}

		$data = array('columns' => $columnsArr, 'boxes' => $boxesArr);
		
		return $this->handleView($this->view($data));
	}

	// 创建
	public function postColumnsAction()
	{
		$pageTemplate = new PageTemplate();
		// 指定website
		$website = $this->container->get('chenxi_website_manager')->find($this->getWebsiteId());
		$pageTemplate->setWebsite($website);

		return $this->process($pageTemplate, true);
	}

	// 删除相册
	public function deleteColumnAction($id)
	{
		$pageTemplateManager = $this->container->get('chenxi_page_template_manager');
		$pageTemplate = $pageTemplateManager->find($id);

		// remove tags relate pageTemplate
		$tagManager = $this->container->get('fpn_tag.tag_manager');
		$tagManager->deleteTagging($pageTemplate);

		// remove pageTemplate
		$pageTemplateManager->delete($pageTemplate);

		return $this->handleView($this->view(null, 204));
	}

	// 修改相册
	public function putTemplateAction($id)
	{
		$pageTemplate = $this->container->get('chenxi_page_template_manager')->find($id);

		return $this->process($pageTemplate);
	}

	// 得到
	public function getTemplateAction($id)
	{
		$pageTemplate = $this->container->get('chenxi_page_template_manager')->find($id);

		
		if(!$pageTemplate)
		{
			$pageTemplate = array('error' => 1);
		}

		$data = $this->getData($pageTemplate);

		return $this->handleView($this->view($data));
	}

	public function process(PageTemplate $pageTemplate, $new = false)
	{
		$statusCode = $new ? 201 : 204;
		$form = $this->createForm(new PageTemplateType(), $pageTemplate);
		$data = $this->getRequest()->request->all();
		$children = $form->all();
		$toBind = array_intersect_key($data, $children);

		// print_r($toBind);
		// $toBind['start_date'] = new \DateTime($toBind['start_date']);
		// $toBind['end_date'] = new \DateTime($toBind['end_date']);

		$form->bind($toBind);

		if($form->isValid()){
			// print_r($pageTemplate);
			// return;
			$this->container->get('chenxi_page_template_manager')->update($pageTemplate);

			$data = $this->getData($pageTemplate);

			return $this->handleView($this->view($new ? $data : null, $statusCode));
		}
		
		return $this->handleView($this->view($form, 400));
	}

	function getData(PageTemplate $pageTemplate){
		$data = array();
		$data['id'] = $pageTemplate->getId();
		$data['name'] = $pageTemplate->getName();
		$data['isPrimary'] = $pageTemplate->getIsPrimary();
		$data['contentType'] = $pageTemplate->getContentType();

		return $data;
	}

	function getWebsiteId()
	{
		return $this->getRequest()->getSession()->get('websiteId');
	}
}