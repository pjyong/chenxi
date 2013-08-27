<?php

namespace ChenXi\ContentBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\ContentBundle\Entity\Gallery;
use ChenXi\ContentBundle\Form\Type\GalleryType;




class GalleriesController extends FOSRestController
{
	// get the collection
	public function getGalleriesAction()
	{
		$criteria = array('websiteId' => $this->getWebsiteId());

		$galleries = $this->container->get('chenxi_gallery_manager')->findBy($criteria);

		return $this->handleView($this->view($galleries));
	}

	// create
	public function postGalleriesAction()
	{
		$gallery = new Gallery();
		// 指定website
		$website = $this->container->get('chenxi_website_manager')->find($this->getWebsiteId());
		$gallery->setWebsite($website);

		return $this->process($gallery, true);
	}

	// delete
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

	// update
	public function putGalleryAction($id)
	{
		$gallery = $this->container->get('chenxi_gallery_manager')->find($id);

		return $this->process($gallery);
	}

	// read
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
		

		return $this->handleView($this->view($gallery));
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

	function getWebsiteId()
	{
		return $this->getRequest()->getSession()->get('websiteId');
	}
}