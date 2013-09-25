<?php

namespace ChenXi\ContentBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\ContentBundle\Entity\Page;
use ChenXi\ContentBundle\Form\Type\PageType;




class PagesController extends FOSRestController
{
	// 获得相册列表
	public function getPagesAction()
	{
		$criteria = array('websiteId' => $this->getWebsiteId());

		$pages = $this->container->get('chenxi_page_manager')->findBy($criteria);

		return $this->handleView($this->view($pages));
	}

	// 创建相册
	public function postPagesAction()
	{
		$page = new Page();
		// 指定website
		$website = $this->container->get('chenxi_website_manager')->find($this->getWebsiteId());
		$page->setWebsite($website);

		return $this->process($page, true);
	}

	// 删除相册
	public function deletePageAction($id)
	{
		$pageManager = $this->container->get('chenxi_page_manager');
		$page = $pageManager->find($id);

		// remove tags relate page
		$tagManager = $this->container->get('fpn_tag.tag_manager');
		$tagManager->deleteTagging($page);

		// remove page
		$pageManager->delete($page);

		return $this->handleView($this->view(null, 204));
	}

	// 修改相册
	public function putPageAction($id)
	{
		$page = $this->container->get('chenxi_page_manager')->find($id);

		return $this->process($page);
	}

	// 得到相册
	public function getPageAction($id)
	{
		$page = $this->container->get('chenxi_page_manager')->find($id);

		// load tags
		$tagManager = $this->container->get('fpn_tag.tag_manager');
		$tagManager->loadTagging($page);

		if(!$page)
		{
			$page = array('error' => 1);
		}

		return $this->handleView($this->view($page));
	}

	public function process(Page $page, $new = false)
	{
		$statusCode = $new ? 201 : 204;
		$form = $this->createForm(new PageType(), $page);
		$data = $this->getRequest()->request->all();
		$children = $form->all();
		$toBind = array_intersect_key($data, $children);

		// print_r($toBind);
		// $toBind['start_date'] = new \DateTime($toBind['start_date']);
		// $toBind['end_date'] = new \DateTime($toBind['end_date']);

		$form->bind($toBind);

		if($form->isValid()){
			// print_r($page);
			// return;
			$this->container->get('chenxi_page_manager')->update($page);

			// save tags
			// $tagManager = $this->container->get('fpn_tag.tag_manager');
			// $tagNames = $tagManager->splitTagNames($this->getRequest()->request->get('tags'));
			// $tags = $tagManager->loadOrCreateTags($tagNames);
			// $tagManager->addTags($tags, $page);
			// $tagManager->saveTagging($page);


			return $this->handleView($this->view($new ? $page : null, $statusCode));
		}
		
		return $this->handleView($this->view($form, 400));
		// $isValid = true;
		// $title = $this->getRequest()->request->get('title');
		// $start_date = $this->getRequest()->request->get('start_date');
		// $end_date = $this->getRequest()->request->get('end_date');
		// $body = $this->getRequest()->request->get('body');


		// if($isValid){
		// 	$page->setTitle($title);
		// 	$page->setBody($body);
		// 	$page->setStartDate(new \DateTime($start_date));
		// 	$page->setEndDate(new \DateTime($end_date));

		// 	$this->container->get('chenxi_page_manager')->update($page);

		// 	return $this->handleView($this->view($page));
		// }
	}

	function getWebsiteId()
	{
		return $this->getRequest()->getSession()->get('websiteId');
	}
}