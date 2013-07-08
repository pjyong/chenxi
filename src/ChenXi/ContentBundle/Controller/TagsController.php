<?php

namespace ChenXi\ContentBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

class TagsController extends FOSRestController implements ClassResourceInterface
{
	// get the collection
	public function cgetAction()
	{
		$articles = array(array('name' => 'wokao'), array('name' => 'haaa'));
		return $this->handleView($this->view($articles));
	}

	

}