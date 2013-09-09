<?php

namespace ChenXi\ContentBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\ContentBundle\Entity\Article;
use ChenXi\ContentBundle\Form\Type\ArticleType;




class ArticlesController extends FOSRestController
{
	// 获得相册列表
	public function getArticlesAction()
	{
		$criteria = array('websiteId' => $this->getWebsiteId());

		$articles = $this->container->get('chenxi_article_manager')->findBy($criteria);

		return $this->handleView($this->view($articles));
	}

	// 创建相册
	public function postArticlesAction()
	{
		$article = new Article();
		// 指定website
		$website = $this->container->get('chenxi_website_manager')->find($this->getWebsiteId());
		$article->setWebsite($website);

		return $this->process($article, true);
	}

	// 删除相册
	public function deleteArticleAction($id)
	{
		$articleManager = $this->container->get('chenxi_article_manager');
		$article = $articleManager->find($id);

		// remove tags relate article
		$tagManager = $this->container->get('fpn_tag.tag_manager');
		$tagManager->deleteTagging($article);

		// remove article
		$articleManager->delete($article);

		return $this->handleView($this->view(null, 204));
	}

	// 修改相册
	public function putArticleAction($id)
	{
		$article = $this->container->get('chenxi_article_manager')->find($id);

		return $this->process($article);
	}

	// 得到相册
	public function getArticleAction($id)
	{
		$article = $this->container->get('chenxi_article_manager')->find($id);

		// load tags
		$tagManager = $this->container->get('fpn_tag.tag_manager');
		$tagManager->loadTagging($article);

		if(!$article)
		{
			$article = array('error' => 1);
		}

		return $this->handleView($this->view($article));
	}

	public function process(Article $article, $new = false)
	{
		$statusCode = $new ? 201 : 204;
		$form = $this->createForm(new ArticleType(), $article);
		$data = $this->getRequest()->request->all();
		$children = $form->all();
		$toBind = array_intersect_key($data, $children);

		// print_r($toBind);
		// $toBind['start_date'] = new \DateTime($toBind['start_date']);
		// $toBind['end_date'] = new \DateTime($toBind['end_date']);

		$form->bind($toBind);

		if($form->isValid()){
			// print_r($article);
			// return;
			$this->container->get('chenxi_article_manager')->update($article);

			// save tags
			// $tagManager = $this->container->get('fpn_tag.tag_manager');
			// $tagNames = $tagManager->splitTagNames($this->getRequest()->request->get('tags'));
			// $tags = $tagManager->loadOrCreateTags($tagNames);
			// $tagManager->addTags($tags, $article);
			// $tagManager->saveTagging($article);


			return $this->handleView($this->view($new ? $article : null, $statusCode));
		}
		
		return $this->handleView($this->view($form, 400));
		// $isValid = true;
		// $title = $this->getRequest()->request->get('title');
		// $start_date = $this->getRequest()->request->get('start_date');
		// $end_date = $this->getRequest()->request->get('end_date');
		// $body = $this->getRequest()->request->get('body');


		// if($isValid){
		// 	$article->setTitle($title);
		// 	$article->setBody($body);
		// 	$article->setStartDate(new \DateTime($start_date));
		// 	$article->setEndDate(new \DateTime($end_date));

		// 	$this->container->get('chenxi_article_manager')->update($article);

		// 	return $this->handleView($this->view($article));
		// }
	}

	function getWebsiteId()
	{
		return $this->getRequest()->getSession()->get('websiteId');
	}
}