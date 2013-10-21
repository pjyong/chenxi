<?php
namespace ChenXi\LayoutBundle\BoxType;

use ChenXi\LayoutBundle\Entity\BoxType;
use ChenXi\LayoutBundle\Entity\BoxTypeManager;
use ChenXi\LayoutBundle\Entity\BoxTypeProperty;
use ChenXi\LayoutBundle\Entity\BoxTypePropertyManager;

class Content implements BoxTypeInterface
{

	private $boxTypeManager;

	private $boxTypePropertyManager;

	public function __construct(BoxTypeManager $boxTypeManager, BoxTypePropertyManager $boxTypePropertyManager)
	{
		$this->boxTypeManager = $boxTypeManager;
		$this->boxTypePropertyManager = $boxTypePropertyManager;
	}
	public function displayForm(BoxType $boxType)
	{
		return '';
	}

	public function persistToDB()
	{
		$boxType = $this->getBoxType();
		$boxType->setLabel('Content');
		$boxType->setChineseLabel('内容');
		$boxType->setCategoryLabel('content');

		// 创建属性
		// $boxTypeProperty1 = new BoxTypeProperty();
		// $boxTypeProperty1->setBoxType($boxType);
		// $boxTypeProperty1->setLabel();

		// 
		$this->boxTypeManager->update($boxType);
		return $boxType;
	}

	public function getBoxType()
	{
		// 
		$boxType = $this->boxTypeManager->findOneBy(array('label' => 'Content'));
		if(!$boxType){
			return new BoxType();
		}

		return $boxType;
	}
}