<?php

namespace ChenXi\ContentBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\ContentBundle\Entity\Article;
use ChenXi\ContentBundle\Form\Type\ArticleType;


class ArticlesController extends FOSRestController
{
	// get the collection
	public function getArticlesAction()
	{
		$articles = $this->container->get('chenxi_article_manager')->findS();

		return $this->handleView($this->view($articles));
	}

	// create
	public function postArticlesAction()
	{
		return $this->process(new Article());
	}

	// delete
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

	// update
	public function putArticleAction($id)
	{
		$article = $this->container->get('chenxi_article_manager')->find($id);

		return $this->process($article);
	}

	// read
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



	public function process(Article $article)
	{
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
			$tagManager = $this->container->get('fpn_tag.tag_manager');
			$tagNames = $tagManager->splitTagNames($this->getRequest()->request->get('tags'));
			$tags = $tagManager->loadOrCreateTags($tagNames);
			$tagManager->addTags($tags, $article);
			$tagManager->saveTagging($article);


			return $this->handleView($this->view($article));
		}
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
}