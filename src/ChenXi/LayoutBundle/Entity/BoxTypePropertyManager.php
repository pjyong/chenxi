<?php

namespace ChenXi\LayoutBundle\Entity;

use Doctrine\ORM\EntityManager;
use ChenXi\LayoutBundle\Entity\BoxTypeProperty;

class BoxTypePropertyManager
{
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


	public function delete(BoxTypeProperty $boxTypeProperty)
	{
		$this->em->remove($boxTypeProperty);
		$this->em->flush();
	}

	public function update(BoxTypeProperty $boxTypeProperty, $andFlush = true)
	{
		$this->em->persist($boxTypeProperty);
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
    	$query = $this->em->createQuery('SELECT a FROM ChenXi\LayoutBundle\Entity\PageTemplate a JOIN a.website w WHERE w.id = :wid');
    	$query->setParameter(':wid', $criteria['websiteId']);
    	return $query->getResult();
    }
}