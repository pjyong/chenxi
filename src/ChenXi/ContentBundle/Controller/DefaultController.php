<?php

namespace ChenXi\ContentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('ChenXiContentBundle:Default:index.html.twig', array('name' => $name));
    }
}
