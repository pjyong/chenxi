<?php

namespace ChenXi\LayoutBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\LayoutBundle\Entity\TemplateBox;
use ChenXi\LayoutBundle\Entity\ColumnTemplate;

// PageTemplate 资源


class TemplateboxesController extends FOSRestController
{
	// 得到
	public function getTemplateboxAction($id)
	{
		$box = $this->container->get('chenxi_template_box_manager')->find($id);

		
		$temp2 = array();
		$temp2['id'] = $box->getId();
		$temp2['columnTemplateId'] = $column->getId();
		$temp2['cssCode'] = '';
		$temp2['boxTypeId'] = $box->getBoxType()->getId();
		$temp2['positionId'] = 1;
		// 得到
		$fullClass = 'ChenXi\LayoutBundle\BoxType\\' . $box->getBoxType()->getLabel();
		$boxTypeTransform = new $fullClass($this->container->get('chenxi_box_type_manager'), $this->container->get('chenxi_box_type_property_manager'), $this->container->get('chenxi_template_box_prop_value_manager'));
        $temp2['formStr'] = $boxTypeTransform->displayTemplateBoxForm($box);

		return $this->handleView($this->view($temp2));
	}

	// 修改相册
	public function putTemplateboxAction($id)
	{
		$box = $this->container->get('chenxi_template_box_manager')->find($id);
		


	}

	// 创建
	public function postTemplateboxesAction()
	{
		$templateBox = new TemplateBox();
		$columnManager = $this->container->get('chenxi_column_template_manager');
		$boxTypeManager = $this->container->get('chenxi_box_type_manager');
		$templateBoxManager = $this->container->get('chenxi_template_box_manager');

		$boxTypeId = (int)$this->getRequest()->request->get('boxTypeId');
		$columnTemplateId = (int)$this->getRequest()->request->get('columnTemplateId');

		$templateBox->setBoxType($boxTypeManager->find($boxTypeId));
		$templateBox->setPositionId(1);
		$templateBox->setColumnTemplate($columnManager->find($columnTemplateId));

		$templateBoxManager->update($templateBox);
		
		$responseStr = $this->getRequest()->request->get('responseStr');
		$boxType = $templateBox->getBoxType();
		$fullClass = 'ChenXi\LayoutBundle\BoxType\\' . $boxType->getLabel();
		$boxTypeTransform = new $fullClass($this->container->get('chenxi_box_type_manager'), $this->container->get('chenxi_box_type_property_manager'), $this->container->get('chenxi_template_box_prop_value_manager'));
		$boxTypeTransform->handleTemplateBoxForm($templateBox, $responseStr);


		$data = array();
		$data['id'] = $templateBox->getId();
		$data['columnTemplateId'] = $columnTemplateId;
		$data['boxTypeId'] = $boxTypeId;
		$data['cssCode'] = '';
		$data['positionId'] = 0;
		$data['formStr'] = $boxTypeTransform->displayTemplateBoxForm($templateBox);

		return $this->handleView($this->view($data));
	}

	




	// 获得该template box
	public function getTemplateboxesAction($templateBoxId)
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
				// 得到
				$fullClass = 'ChenXi\LayoutBundle\BoxType\\' . $box->getBoxType()->getLabel();
				$boxTypeTransform = new $fullClass($this->container->get('chenxi_box_type_manager'), $this->container->get('chenxi_box_type_property_manager'), $this->container->get('chenxi_template_box_prop_value_manager'));
		        $temp2['formStr'] = $boxTypeTransform->displayTemplateBoxForm($box);
			
				$boxesArr[] = $temp2;

			}
			$columnsArr[] = $temp;
		}

		$data = array('columns' => $columnsArr, 'boxes' => $boxesArr);
		
		return $this->handleView($this->view($data));
	}

	

	// 删除相册
	public function deleteColumnAction($id)
	{
		

		return $this->handleView($this->view(array()));
	}



	

	

	

	function getWebsiteId()
	{
		return $this->getRequest()->getSession()->get('websiteId');
	}
}