<?php

namespace ChenXi\GalleryBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * ChenXi\GalleryBundle\Entity\Gallery
 *
 * @ORM\Table(name='gallery')
 * @ORM\Entity
 */
class Gallery
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     * @Assert\NotBlank
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity="ChenXi\GalleryBundle\Entity\Image")
     * @JoinTable(name="gallery_image_x_ref", 
     *      joinColumns={@JoinColumn(name='gallery_id', referencedColumnName='id')},
     *      inverseJoinColumns={@JoinColumn(name='image_id', referencedColumnName='id', unique=true)}
     *      )
     */
    protected $images;

    public function __construct()
    {
        $this->images = new ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Gallery
     */
    public function setTitle($title)
    {
        $this->title = $title;
    
        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Gallery
     */
    public function setDescription($description)
    {
        $this->description = $description;
    
        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set images
     *
     * @param \ChenXi\GalleryBundle\Entity\Image $images
     * @return Gallery
     */
    public function setImages(\ChenXi\GalleryBundle\Entity\Image $images = null)
    {
        $this->images = $images;
    
        return $this;
    }

    /**
     * Get images
     *
     * @return \ChenXi\GalleryBundle\Entity\Image 
     */
    public function getImages()
    {
        return $this->images;
    }
}