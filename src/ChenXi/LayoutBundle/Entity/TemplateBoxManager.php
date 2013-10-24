<?php

namespace ChenXi\LayoutBundle\Entity;

use Doctrine\ORM\EntityManager;
use ChenXi\LayoutBundle\Entity\TemplateBox;

class TemplateBoxManager
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


	public function delete(TemplateBox $templateBox)
	{
		$this->em->remove($templateBox);
		$this->em->flush();
	}

	public function update(TemplateBox $templateBox, $andFlush = true)
	{
		$this->em->persist($templateBox);
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
    	$query = $this->em->createQuery('SELECT a FROM ChenXi\LayoutBundle\Entity\TemplateBox a JOIN a.website w WHERE w.id = :wid');
    	$query->setParameter(':wid', $criteria['websiteId']);
    	return $query->getResult();
    }
}