<?php

namespace ChenXi\GalleryBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('ChenXiGalleryBundle:Default:index.html.twig', array('name' => $name));
    }
}
