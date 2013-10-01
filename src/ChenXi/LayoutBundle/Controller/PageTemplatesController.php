<?php

namespace ChenXi\LayoutBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\LayoutBundle\Entity\PageTemplate;
use ChenXi\LayoutBundle\Form\Type\PageTemplateType;




class PageTemplatesController extends FOSRestController
{
	// 获得
	public function getPageTemplatesAction()
	{
		$criteria = array('websiteId' => $this->getWebsiteId());

		$pageTemplates = $this->container->get('chenxi_page_template_manager')->findBy($criteria);

		return $this->handleView($this->view($pageTemplates));
	}

	// 创建
	public function postPageTemplatesAction()
	{
		$pageTemplate = new PageTemplate();
		// 指定website
		$website = $this->container->get('chenxi_website_manager')->find($this->getWebsiteId());
		$pageTemplate->setWebsite($website);

		return $this->process($pageTemplate, true);
	}

	// 删除相册
	public function deletePageTemplateAction($id)
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
	public function putPageTemplateAction($id)
	{
		$pageTemplate = $this->container->get('chenxi_page_template_manager')->find($id);

		return $this->process($pageTemplate);
	}

	// 得到相册
	public function getPageTemplateAction($id)
	{
		$pageTemplate = $this->container->get('chenxi_page_template_manager')->find($id);

		// load tags
		$tagManager = $this->container->get('fpn_tag.tag_manager');
		$tagManager->loadTagging($pageTemplate);

		if(!$pageTemplate)
		{
			$pageTemplate = array('error' => 1);
		}

		return $this->handleView($this->view($pageTemplate));
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

			// save tags
			// $tagManager = $this->container->get('fpn_tag.tag_manager');
			// $tagNames = $tagManager->splitTagNames($this->getRequest()->request->get('tags'));
			// $tags = $tagManager->loadOrCreateTags($tagNames);
			// $tagManager->addTags($tags, $pageTemplate);
			// $tagManager->saveTagging($pageTemplate);


			return $this->handleView($this->view($new ? $pageTemplate : null, $statusCode));
		}
		
		return $this->handleView($this->view($form, 400));
		// $isValid = true;
		// $title = $this->getRequest()->request->get('title');
		// $start_date = $this->getRequest()->request->get('start_date');
		// $end_date = $this->getRequest()->request->get('end_date');
		// $body = $this->getRequest()->request->get('body');


		// if($isValid){
		// 	$pageTemplate->setTitle($title);
		// 	$pageTemplate->setBody($body);
		// 	$pageTemplate->setStartDate(new \DateTime($start_date));
		// 	$pageTemplate->setEndDate(new \DateTime($end_date));

		// 	$this->container->get('chenxi_page_template_manager')->update($pageTemplate);

		// 	return $this->handleView($this->view($pageTemplate));
		// }
	}

	function getWebsiteId()
	{
		return $this->getRequest()->getSession()->get('websiteId');
	}
}