<?php

namespace ChenXi\ContentBundle\Entity;

use Doctrine\ORM\EntityManager;
use ChenXi\ContentBundle\Entity\Image;

use ChenXi\ContentBundle\Interface\Imaging;
class ImageManager
{

	// public function getImageById($id)
	// {
	// 	$query = $this->getEntityManager()
	// 				->createQuery("SELECT a FROM ChenXiContentBundle:Image a WHERE a.id = :id");
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

	public function addImage(Image $image, Imaging $content)
	{
		$content->getImages()->add($image);
	}

	public function addImages(array $images, Imaging $content)
    {
        foreach ($images as $image) {
            if ($image instanceof Image) {
                $this->addImage($image, $content);
            }
        }
    }
    // 绑定图片到某个内容
    public function saveImageRef(Imaging $content)
    {
    	//得到旧的图片
    	$oldImages = $this->getImageRef($content);
    	$newImages = $content->getImages();
    	$imagesToAdd = $newImages;

    	foreach ($oldImages as $oldImage) {
            if ($newImages->exists(function ($index, $newImage) use ($oldImage) {
                return $newImage->getId() == $oldImage->getId();
            })) {
                $imagesToAdd->removeElement($oldImage);
            } else {
                $imagesToRemove[] = $oldImage->getId();
            }
        }

        // 如果要删除图片
        if(sizeof($imagesToRemove))
        {
        	$builder = $this->em->createQueryBuilder();
                $builder
                    ->delete('ChenXi\ContentBundle\Entity\ImageRef', 'i')
                    ->where('i.image_id')
                    ->where($builder->expr()->in('i.image', $imagesToRemove))
                    ->andWhere('i.contentType = :contentType')
                    ->setParameter('contentType', $content->getContentType())
                    ->andWhere('i.contentId = :contentId')
                    ->setParameter('contentId', $content->getContentId())
                    ->getQuery()
                    ->getResult()
                ;
        }


    }

    // 创建

    // 为某个内容载入图片
    public function loadImageRef(Imaging $content)
    {
    	$images = $this->getImageRef($content);
    	$this->replaceImages($images, $content);
    }

    // 根据给定的内容获取所有的图片
    public function getImageRef(Imaging $content)
    {
    	return $this->em
            ->createQueryBuilder()

            ->select('i')
            ->from($this->class, 'i')

            ->innerJoin('i.imageRef', 'i2', Expr\Join::WITH, 'i2.contentId = :id AND i2.contentType = :type')
            ->setParameter('id', $content->getContentId())
            ->setParameter('type', $content->getContentType())

            // ->orderBy('t.name', 'ASC')

            ->getQuery()
            ->getResult()
        ;
    }

    // 用指定的图片替换绑定在当前内容的图片
    public function replaceImages(array $images, Imaging $content)
    {
    	$content->getImages()->clear();
    	$this->addImages($images, $content);
    }




	public function delete(Image $image)
	{
		$this->em->remove($image);
		$this->em->flush();
	}

	public function update(Image $image, $andFlush = true)
	{
		$this->em->persist($image);
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
    	$query = $this->em->createQuery('SELECT a FROM ChenXi\ContentBundle\Entity\Image a JOIN a.website w WHERE w.id = :wid');
    	$query->setParameter(':wid', $criteria['websiteId']);
    	return $query->getResult();
    }
}