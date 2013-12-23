<?php

namespace ChenXi\ContentBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\ContentBundle\Entity\Article;
use ChenXi\ContentBundle\Form\Type\ArticleType;

use ChenXi\ContentBundle\Entity\Image;


class ArticlesController extends FOSRestController
{
	// 获得文章列表
	public function getArticlesAction()
	{
		$criteria = array('websiteId' => $this->getWebsiteId());

		$articles = $this->container->get('chenxi_article_manager')->findBy($criteria);

		$data = array();
		foreach($articles as $article){
			$temp = array();
			$temp['id'] = $article->getId();
			$temp['title'] = $article->getTitle();
			// 得到文章插图
			$imageManager = $this->container->get('chenxi_image_manager');
			$imageManager->loadImageRef($article);
			$images = $article->getImages();

			if(count($images) > 0){
				$temp['path'] = $images[0]->getWebPath();
			}
			$data[] = $temp;
		}
		
		return $this->handleView($this->view($data));
	}

	// 创建文章
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

	// 得到文章
	public function getArticleAction($id)
	{
		$article = $this->container->get('chenxi_article_manager')->find($id);

		$data = array();

		// load tags
		$tagManager = $this->container->get('fpn_tag.tag_manager');
		$tagManager->loadTagging($article);



		$data['id'] = $article->getId();
		$data['title'] = $article->getTitle();
		$data['body'] = $article->getBody();
		$data['start_date'] = $article->getStartDate();
		$data['end_date'] = $article->getEndDate();
		$data['tags'] = array();
		foreach($article->getTags() as $tag){
			$temp = array();
			$temp['id'] = $tag->getId();
			$temp['name'] = $tag->getName();
			$data['tags'][] = $temp;
		}
		// 得到文章插图
		$imageManager = $this->container->get('chenxi_image_manager');
		$imageManager->loadImageRef($article);
		$images = $article->getImages();

		if(count($images) > 0){
			$data['path'] = $images[0]->getWebPath();
		}
		// if(!$article)
		// {
		// 	$article = array('error' => 1);
		// }

		return $this->handleView($this->view($data));
	}

	// 得到文章图片
	public function getArticleImagesAction($articleId)
	{
		$articleManager = $this->container->get('chenxi_article_manager');
		$article = $articleManager->find($articleId);

		// 载入图片
		$imageManager = $this->container->get('chenxi_image_manager');
		$imageManager->loadImageRef($article);

		$images = $article->getImages();

		// 响应数据
		$data = array();
		foreach($images as $image){
			$row = array();
			$row['id'] = $image->getId();
			$row['name'] = $image->getName();
			$row['path'] = $image->getWebPath();
			$data[] = $row;
		}

		// 只得到文章的一张图片
		if(count($data) > 0){
			$data = $data[0];
		}

		return $this->handleView($this->view($data));
	}

	// 插入文章图片
	public function postArticleImagesAction($articleId)
	{
		$file = $this->getRequest()->files->get('file');
		// // print_r($this->getRequest()->request->get('file'));
		$image = new Image();
		// 指定website
		$website = $this->container->get('chenxi_website_manager')->find($this->getWebsiteId());
		$image->setWebsite($website);

		// 过滤掉文件后缀
		$filename = substr($file->getClientOriginalName(), 0, strrpos($file->getClientOriginalName(), '.'));
		$image->setName($filename);
		$image->setFile($file);

		
		$article = $this->container->get('chenxi_article_manager')->find($articleId);

		$imageManager = $this->container->get('chenxi_image_manager');

		// 仅仅保留一张图片
		// $imageManager->loadImageRef($article);
		// 
		$imageManager->addImage($image, $article);
		$imageManager->saveImageRef($article);
		
		$data = array();

		return $this->handleView($this->view($data));
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
			$tagManager = $this->container->get('fpn_tag.tag_manager');
			$tagNames = $tagManager->splitTagNames($this->getRequest()->request->get('tags'));
			$tags = $tagManager->loadOrCreateTags($tagNames);
			$tagManager->addTags($tags, $article);
			$tagManager->saveTagging($article);


			// return $this->handleView($this->view($new ? $article : null, $statusCode));
			return $this->handleView($this->view($article));
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