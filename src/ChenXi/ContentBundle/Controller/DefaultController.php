<?php

namespace ChenXi\ContentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use ChenXi\ContentBundle\Entity\Article;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('ChenXiContentBundle:Default:index.html.twig', array('name' => $name));
    }

    public function testAction()
    {
    	// get some article
  //   	$articleManager = $this->container->get('chenxi_article_manager');
		// $article = $articleManager->find(2);

		// // print_r();
        print '123';
		return new Response(123);

    }
}
