<?php

namespace ChenXi\ContentBundle\Entity;

use Doctrine\ORM\EntityRepository;

class ArticleRepository extends EntityRepository
{

	// public function getArticleById($id)
	// {
	// 	$query = $this->getEntityManager()
	// 				->createQuery("SELECT a FROM ChenXiContentBundle:Article a WHERE a.id = :id");
	// 	$query->setParameter('id', $id);

	// 	return $query->getResult();
	// }



}