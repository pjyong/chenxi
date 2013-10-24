<?php
namespace ChenXi\LayoutBundle\BoxType;

use ChenXi\LayoutBundle\Entity\BoxType;
use ChenXi\LayoutBundle\Entity\BoxTypeManager;
use ChenXi\LayoutBundle\Entity\BoxTypeProperty;
use ChenXi\LayoutBundle\Entity\BoxTypePropertyManager;
use ChenXi\LayoutBundle\Entity\TemplateBoxPropValue;
use ChenXi\LayoutBundle\Entity\TemplateBoxPropValueManager;

use ChenXi\LayoutBundle\Entity\TemplateBox;
use Symfony\Component\HttpFoundation\Request;

class BlogRecentPost implements BoxTypeInterface
{

	private $boxTypeManager;

	private $boxTypePropertyManager;

	private $templateBoxPropValueManager;

	public function __construct(BoxTypeManager $boxTypeManager, BoxTypePropertyManager $boxTypePropertyManager, TemplateBoxPropValueManager $templateBoxPropValueManager)
	{
		$this->boxTypeManager = $boxTypeManager;
		$this->boxTypePropertyManager = $boxTypePropertyManager;
		$this->templateBoxPropValueManager = $templateBoxPropValueManager;
	}

	public function displayTemplateBoxForm(TemplateBox $templateBox)
	{
		$html = '';
		$boxType = $templateBox->getBoxType();
		$allProperties = $boxType->getBoxTypeProperties();
		foreach($allProperties as $property)
		{
			$label = $property->getLabel();
			$propValue = $this->templateBoxPropValueManager->findOneBy(array(
					'boxTypeProperty' => $property->getId(),
					'templateBox' => $templateBox->getId()
					));
			// 如果没有该区块的值
			if(!$propValue){
				if($label == 'showNum'){
					$html .= '<div class="form-group"><label class="col-sm-3 control-label no-padding-right">显示数目：</label><div class="col-sm-9"><select name="showNum"><option value="10">10</option><option value="20">20</option><option value="30">30</option></select></div></div>';
				}
			}else{
				$value = $propValue->getValue();
				if($label == 'showNum'){

					$html .= '<div class="form-group"><label class="col-sm-3 control-label no-padding-right">显示数目：</label><div class="col-sm-9"><select name="showNum"><option ' . ($value == 10 ? 'selected' : '') . ' value="10">10</option><option ' . ($value == 20 ? 'selected' : '') . ' value="20">20</option><option ' . ($value == 30 ? 'selected' : '') . ' value="30">30</option></select></div></div>';
				}
			}

			
		}

		return $html;
	}

	public function handleTemplateBoxForm(TemplateBox $templateBox, $responseStr)
	{
		$propValArr = json_decode($responseStr, true);
		$newArr = array();
		foreach($propValArr as $b){
			$newArr[$b['name']] = $b['value'];
		}
		// 得到showNum的值

		// 得到所有的设置


		$propValObjArr = $templateBox->getTemplateBoxPropValues();
		$boxTypeProperties = $templateBox->getBoxType()->getBoxTypeProperties();
		if($boxTypeProperties){
			foreach($boxTypeProperties as $boxTypeProperty){
				// 区块类型属性和区块
				$propValue = $this->templateBoxPropValueManager->findOneBy(array(
					'boxTypeProperty' => $boxTypeProperty->getId(),
					'templateBox' => $templateBox->getId()
					));
				if(!$propValue){
					$propValue = new TemplateBoxPropValue();
					$propValue->setTemplateBox($templateBox);
					$propValue->setBoxTypeProperty($boxTypeProperty);
				}
				if(array_key_exists($boxTypeProperty->getLabel(), $newArr)){
					$propValue->setValue($newArr[$boxTypeProperty->getLabel()]);
				}
				$this->templateBoxPropValueManager->update($propValue);
			}
		}

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