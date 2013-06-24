<?php

namespace ChenXi\CmsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('ChenXiCmsBundle:Default:index.html.twig', array('name' => $name));
    }
}
