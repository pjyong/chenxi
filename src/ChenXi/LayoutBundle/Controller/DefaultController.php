<?php

namespace ChenXi\LayoutBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{

    public function newBoxTypeAction($label)
    {

    	$fullClass = 'ChenXi\LayoutBundle\BoxType\\' . $label;
        if(!class_exists($fullClass))
        {
            return new Response('请将创建指定的区块类型');
        }

        $boxType = new $fullClass($this->container->get('chenxi_box_type_manager'), $this->container->get('chenxi_box_type_property_manager'));
        $boxTypeLabel = $boxType->persistToDB()->getChineseLabel();

        return new Response("***$boxTypeLabel区块***已经创建成功");

    }
}
