<?php

namespace ChenXi\ContentBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\ContentBundle\Entity\Gallery;
use ChenXi\ContentBundle\Entity\Image;
use ChenXi\ContentBundle\Form\Type\GalleryType;
use ChenXi\ContentBundle\Form\Type\ImageType;

use Symfony\Component\HttpFoundation\File\UploadedFile;


class GalleriesController extends FOSRestController
{
	// 得到相册列表
	public function getGalleriesAction()
	{
		$criteria = array('websiteId' => $this->getWebsiteId());
		$galleries = $this->container->get('chenxi_gallery_manager')->findBy($criteria);

		return $this->handleView($this->view($galleries));
	}

	// 创建相册
	public function postGalleriesAction()
	{
		$gallery = new Gallery();
		// 指定website
		$website = $this->container->get('chenxi_website_manager')->find($this->getWebsiteId());
		$gallery->setWebsite($website);

		return $this->process($gallery, true);
	}

	// 删除相册
	public function deleteGalleryAction($id)
	{
		$galleryManager = $this->container->get('chenxi_gallery_manager');
		$gallery = $galleryManager->find($id);

		// remove tags relate gallery
		$tagManager = $this->container->get('fpn_tag.tag_manager');
		$tagManager->deleteTagging($gallery);

		// remove gallery
		$galleryManager->delete($gallery);

		return $this->handleView($this->view(null, 204));
	}

	// 修改相册
	public function putGalleryAction($id)
	{
		$gallery = $this->container->get('chenxi_gallery_manager')->find($id);

		return $this->process($gallery);
	}

	// 得到相册
	public function getGalleryAction($id)
	{
		$gallery = $this->container->get('chenxi_gallery_manager')->find($id);

		// load tags
		// $tagManager = $this->container->get('fpn_tag.tag_manager');
		// $tagManager->loadTagging($gallery);

		if(!$gallery)
		{
			$gallery = array('error' => 1);
		}


		// 响应数据
		$data = array();
		$data['id'] = $gallery->getId();
		$data['title'] = $gallery->getTitle();
		$data['created_date'] = $gallery->getCreatedDate();
		$data['description'] = $gallery->getDescription();

		return $this->handleView($this->view($data));
	}

	public function process(Gallery $gallery, $new = false)
	{
		$statusCode = $new ? 201 : 204;
		$form = $this->createForm(new GalleryType(), $gallery);
		$data = $this->getRequest()->request->all();
		$children = $form->all();
		$toBind = array_intersect_key($data, $children);

		// print_r($toBind);
		// $toBind['start_date'] = new \DateTime($toBind['start_date']);
		// $toBind['end_date'] = new \DateTime($toBind['end_date']);

		$form->bind($toBind);

		if($form->isValid()){
			// print_r($gallery);
			// return;
			$this->container->get('chenxi_gallery_manager')->update($gallery);

			// save tags
			// $tagManager = $this->container->get('fpn_tag.tag_manager');
			// $tagNames = $tagManager->splitTagNames($this->getRequest()->request->get('tags'));
			// $tags = $tagManager->loadOrCreateTags($tagNames);
			// $tagManager->addTags($tags, $gallery);
			// $tagManager->saveTagging($gallery);

			return $this->handleView($this->view($new ? $gallery : null, $statusCode));
		}

		return $this->handleView($this->view($form, 400));
		// $isValid = true;
		// $title = $this->getRequest()->request->get('title');
		// $start_date = $this->getRequest()->request->get('start_date');
		// $end_date = $this->getRequest()->request->get('end_date');
		// $body = $this->getRequest()->request->get('body');


		// if($isValid){
		// 	$gallery->setTitle($title);
		// 	$gallery->setBody($body);
		// 	$gallery->setStartDate(new \DateTime($start_date));
		// 	$gallery->setEndDate(new \DateTime($end_date));

		// 	$this->container->get('chenxi_gallery_manager')->update($gallery);

		// 	return $this->handleView($this->view($gallery));
		// }
	}

	// 得到某个相册所有图片
	public function getGalleryImagesAction($galleryId)
	{
		$galleryManager = $this->container->get('chenxi_gallery_manager');
		$gallery = $galleryManager->find($galleryId);

		$images = $gallery->getImages();

		// 响应数据
		$data = array();
		foreach($images as $image){
			$row = array();
			$row['id'] = $image->getId();
			$row['name'] = $image->getName();
			$row['path'] = $image->getWebPath();
			$data[] = $row;
		}

		return $this->handleView($this->view($data));
	}

	// 删除相册图片
	public function deleteGalleryImagesAction($galleryId, $imageId){
		$image = $this->container->get('chenxi_image_manager')->find($imageId);
		$gallery = $this->container->get('chenxi_gallery_manager')->find($galleryId);
		$gallery->removeImage($image);
		$this->container->get('chenxi_gallery_manager')->update($gallery);

		return $this->handleView($this->view(null, 204));
	}

	// 修改相册图片
	public function putGalleryImagesAction($galleryId, $imageId){
		// 
		$image = $this->container->get('chenxi_image_manager')->find($imageId);
		$image->setName($this->getRequest()->request->get('name'));
		// $image->setPath($this->getRequest()->request->get('path'));

		$this->container->get('chenxi_image_manager')->update($image);
		$data = array();
		$data['id'] = $image->getId();
		$data['name'] = $image->getName();		
		$data['path'] = $image->getWebPath();

		return $this->handleView($this->view($data));
	}

	// 插入相册图片
	public function postGalleryImagesAction($galleryId)
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

		// $form = $this->createForm(new ImageType(), $image);
		// $data = $this->getRequest()->request->all();
		// $children = $form->all();
		// $toBind = array_intersect_key($data, $children);

		// // print_r($toBind);
		// // $toBind['start_date'] = new \DateTime($toBind['start_date']);
		// // $toBind['end_date'] = new \DateTime($toBind['end_date']);

		// $form->bind($toBind);

		// if($form->isValid()){
		$gallery = $this->container->get('chenxi_gallery_manager')->find($galleryId);
		$gallery->addImage($image);

		$this->container->get('chenxi_gallery_manager')->update($gallery);
		// }
		
		// $this->container->get('chenxi_image_manager')->update($image);
		// 响应数据
		// $data = array();
		$data = array();

		return $this->handleView($this->view($data));
	}

	function getWebsiteId()
	{
		return $this->getRequest()->getSession()->get('websiteId');
	}
}