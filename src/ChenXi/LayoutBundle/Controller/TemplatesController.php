<?php

namespace ChenXi\LayoutBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\LayoutBundle\Entity\PageTemplate;
use ChenXi\LayoutBundle\Form\Type\PageTemplateType;

// PageTemplate 资源


class TemplatesController extends FOSRestController
{
	// 获得
	public function getTemplatesAction()
	{
		$criteria = array('websiteId' => $this->getWebsiteId());

		$pageTemplates = $this->container->get('chenxi_page_template_manager')->findBy($criteria);

		return $this->handleView($this->view($pageTemplates));
	}

	// 创建
	public function postTemplatesAction()
	{
		$pageTemplate = new PageTemplate();
		// 指定website
		$website = $this->container->get('chenxi_website_manager')->find($this->getWebsiteId());
		$pageTemplate->setWebsite($website);

		return $this->process($pageTemplate, true);
	}

	// 删除相册
	public function deleteTemplateAction($id)
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