<?php
namespace ChenXi\LayoutBundle\BoxType;

use ChenXi\LayoutBundle\Entity\BoxType;
use ChenXi\LayoutBundle\Entity\BoxTypeManager;
use ChenXi\LayoutBundle\Entity\BoxTypeProperty;
use ChenXi\LayoutBundle\Entity\BoxTypePropertyManager;

class BlogRecentPost implements BoxTypeInterface
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
		$html = '';
		$allProperties = $boxType->getBoxTypeProperties();
		foreach($allProperties as $property)
		{
			$label = $property->getLabel();
			if($label == 'showNum'){
				$html .= '显示数目：<select class="showNum"><option value="10">10</option><option value="10">20</option></select>';
			}
		}

		return $html;
	}

	public function displayBox()
	{

	}
	
	public function persistToDB()
	{
		$boxType = $this->getBoxType();
		$boxType->setLabel('BlogRecentPost');
		$boxType->setChineseLabel('最新博文列表');
		$boxType->setCategoryLabel('blog');

		// 创建属性一
		// 显示多少篇博文:showNum
		$boxTypeProperty1 = new BoxTypeProperty();
		$boxTypeProperty1->setBoxType($boxType);
		$boxTypeProperty1->setLabel('showNum');

		$boxType->addBoxTypePropertie($boxTypeProperty1);
		// 
		$this->boxTypeManager->update($boxType);
		return $boxType;
	}

	public function getBoxType()
	{
		// 
		$boxType = $this->boxTypeManager->findOneBy(array('label' => 'BlogRecentPost'));
		if(!$boxType){
			return new BoxType();
		}


		return $boxType;
	}
}