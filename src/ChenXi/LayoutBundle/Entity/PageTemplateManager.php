<?php

namespace ChenXi\LayoutBundle\Entity;

use Doctrine\ORM\EntityManager;
use ChenXi\LayoutBundle\Entity\PageTemplate;

class PageTemplateManager
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


	public function delete(PageTemplate $pageTemplate)
	{
		$this->em->remove($pageTemplate);
		$this->em->flush();
	}

	public function update(PageTemplate $pageTemplate, $andFlush = true)
	{
		$this->em->persist($pageTemplate);
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
    	$sql = 'SELECT a FROM ChenXi\LayoutBundle\Entity\PageTemplate a JOIN a.website w WHERE w.id = :wid';
    	$sql .= isset($criteria['contentType']) ? ' AND a.contentType = :contenttype' : '';
    	$query = $this->em->createQuery($sql);
    	$query->setParameter(':wid', $criteria['websiteId']);
    	if(isset($criteria['contentType'])){
    		$query->setParameter(':contenttype', $criteria['contentType']);
    	}
    	return $query->getResult();
    }
}