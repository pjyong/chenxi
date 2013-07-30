<?php

namespace ChenXi\MainBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\MainBundle\Entity\Website;
use ChenXi\MainBundle\Form\Type\WebsiteType;

use Symfony\Component\HttpFoundation\Response;


class WebsitesController extends FOSRestController
{
	// get the collection
	public function getWebsitesAction()
	{
		$websites = $this->container->get('chenxi_website_manager')->findS();

		return $this->handleView($this->view($websites));
	}

	// create
	public function postWebsitesAction()
	{
		return $this->process(new Website(), true);
	}

	// delete
	public function deleteWebsiteAction($id)
	{
		$websiteManager = $this->container->get('chenxi_website_manager');
		$website = $websiteManager->find($id);

		// remove website
		$websiteManager->delete($website);

		return $this->handleView($this->view(null, 204));
	}

	// update
	public function putWebsiteAction($id)
	{
		$website = $this->container->get('chenxi_website_manager')->find($id);

		return $this->process($website);
	}

	// read
	public function getWebsiteAction($id)
	{
		
		$website = $this->container->get('chenxi_website_manager')->find($id);

		if(!$website)
		{
			$website = array('error' => 1);
		}

		// 指定view格式，这样从getWebsiteFromSessionAction进入时就不会有template报错
		$view = $this->view($website);
		$view->setFormat('json');

		return $this->handleView($view);
	}

	// 从Session中读取
	public function getWebsiteFromSessionAction()
	{
		$websiteId = $this->getRequest()->getSession()->get('websiteId');

		return $this->getWebsiteAction($websiteId);
	}



	public function process(Website $website, $new = false)
	{
		$statusCode = $new ? 201 : 204;
		$form = $this->createForm(new WebsiteType(), $website);
		$data = $this->getRequest()->request->all();
		$children = $form->all();
		$toBind = array_intersect_key($data, $children);

		// print_r($toBind);
		// $toBind['start_date'] = new \DateTime($toBind['start_date']);
		// $toBind['end_date'] = new \DateTime($toBind['end_date']);

		$form->bind($toBind);

		if($form->isValid()){
			// print_r($website);
			// return;
			$this->container->get('chenxi_website_manager')->update($website);


			return $this->handleView($this->view($new ? $website : null, $statusCode));
		}
		return $this->handleView($this->view($form, 400));


		// $isValid = true;
		// $title = $this->getRequest()->request->get('title');
		// $start_date = $this->getRequest()->request->get('start_date');
		// $end_date = $this->getRequest()->request->get('end_date');
		// $body = $this->getRequest()->request->get('body');


		// if($isValid){
		// 	$website->setTitle($title);
		// 	$website->setBody($body);
		// 	$website->setStartDate(new \DateTime($start_date));
		// 	$website->setEndDate(new \DateTime($end_date));

		// 	$this->container->get('chenxi_website_manager')->update($website);

		// 	return $this->handleView($this->view($website));
		// }
		
	}
}