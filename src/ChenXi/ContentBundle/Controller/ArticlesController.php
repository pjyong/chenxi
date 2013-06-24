<?php

namespace ChenXi\ContentBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\ContentBundle\Entity\Article;
use ChenXi\ContentBundle\Form\ArticleType;

class ArticlesController extends FOSRestController implements ClassResourceInterface
{
	// get the collection
	public function cgetAction()
	{
		$articles = array(array('name' => 'wokao'), array('name' => 'haaa'));
		return $this->handleView($this->view($articles));
	}

	// read
	public function getAction($id)
	{
		$article = $this->container->get('chenxi_article_manager')->find($id);

		if(!$article)
		{
			throw $this->createNotFoundException();
		}

		return $this->handleView($this->view($article));
	}

	// update
	public function putAction()
	{

	}

	// create
	public function postAction()
	{
		// return $this->processData(new Article(), true);
	}

	// delete
	public function deleteAction()
	{

	}

	public function processData(Article $article, $new = false)
	{
		// $statusCode = $new ? 201 : 204;
		// $form = $this->createForm(new ArticleType(), $article);
		// $data = $this->getRequest()->request->all();
		// $children = $form->all();
		// $toBind = array_intersect_key($data, $children);

		// $form->bind($toBind);

		// if($form->isValid())
		// {
  //           $this->container->get('chenxi_article_manager')->update($article);

  //           return $this->handleView($this->view($new ? $article : null, $statusCode));
  //       }

  //       return $this->handleView($this->view($form, 400));
	}

}