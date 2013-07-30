<?php

namespace ChenXi\ContentBundle\Entity;

use Doctrine\ORM\EntityManager;
use ChenXi\ContentBundle\Entity\Article;

class ArticleManager
{

	// public function getArticleById($id)
	// {
	// 	$query = $this->getEntityManager()
	// 				->createQuery("SELECT a FROM ChenXiContentBundle:Article a WHERE a.id = :id");
	// 	$query->setParameter('id', $id);

	// 	return $query->getResult();
	// }

	protected $em;
	protected $class;
	protected $repository;

	public function __construct(EntityManager $em, $class)
	{
		$this->em = $em;
		$this->repository = $em->getRepository($class);
		$metadata = $em->getClassMetadata($class);
		$this->class = $metadata->getName();
	}


	public function delete(Article $article)
	{
		$this->em->remove($article);
		$this->em->flush();
	}

	public function update(Article $article, $andFlush = true)
	{
		$this->em->persist($article);
		if($andFlush)
		{
			$this->em->flush();
		}
	}

	public function find($id)
	{
		return $this->repository->find($id);
	}

	public function findOneBy(array $criteria)
    {
    	return $this->repository->findOneBy($criteria);
    }

    public function findAll()
    {
    	return $this->repository->findAll();
    }

    public function findBy(array $criteria)
    {
    	$query = $this->em->createQuery('SELECT a FROM ChenXi\ContentBundle\Entity\Article a JOIN a.website w WHERE w.id = :wid');
    	$query->setParameter(':wid', $criteria['websiteId']);
    	return $query->getResult();
    }
}