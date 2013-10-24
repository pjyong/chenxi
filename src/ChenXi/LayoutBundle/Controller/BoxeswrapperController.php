<?php
// 保存同一个页面的多个区块
namespace ChenXi\LayoutBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;

use ChenXi\LayoutBundle\Entity\TemplateBox;

// PageTemplate 资源


class BoxeswrapperController extends FOSRestController
{
	// id
	public $columns = array();
	public $data = array();

	public $pageTemplate;

	// 创建
	public function postBoxeswrapperAction()
	{
		// print '123';
		$boxes = $this->getRequest()->request->all();

		return $this->handleView($this->view());
	}

	

}