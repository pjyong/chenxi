<?php

namespace ChenXi\ContentBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use Symfony\Component\HttpFoundation\Session\Session;

class TagsController extends FOSRestController implements ClassResourceInterface
{
	// get the collection
	public function cgetAction()
	{
		print_r($_COOKIE);
		$articles = array(array('name' => 'wokao'), array('name' => 'haaa'));
		// $session = new Session();
		print_r($this->getRequest()->getSession()->get('websiteId'));
		return $this->handleView($this->view($articles));
	}

	

}