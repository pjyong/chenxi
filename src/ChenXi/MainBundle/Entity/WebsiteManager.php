<?php

namespace ChenXi\MainBundle\Entity;

use Doctrine\ORM\EntityManager;
use ChenXi\MainBundle\Entity\Website;

class WebsiteManager
{

	// public function getWebsiteById($id)
	// {
	// 	$query = $this->getEntityManager()
	// 				->createQuery("SELECT a FROM ChenXiContentBundle:Website a WHERE a.id = :id");
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

	public function find($id)
	{
		return $this->repository->find($id);
	}

	public function delete(Website $website)
	{
		$this->em->remove($website);
		$this->em->flush();
	}

	public function update(Website $website, $andFlush = true)
	{
		$this->em->persist($website);
		if($andFlush)
		{
			$this->em->flush();
		}
	}

	public function findOneBy(array $criteria)
    {
    	return $this->repository->findOneBy($criteria);
    }

    public function findS()
    {
    	return $this->repository->findAll();
    }
}