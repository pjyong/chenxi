<?php

namespace ChenXi\LayoutBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('LayoutBundle:Default:index.html.twig', array('name' => $name));
    }
}
