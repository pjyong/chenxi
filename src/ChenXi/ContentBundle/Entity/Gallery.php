<?php

namespace ChenXi\ContentBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * ChenXi\ContentBundle\Entity\Gallery
 *
 * @ORM\Table(name="gallery")
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
     * @ORM\Column(type="datetime")
     */
    private $created_date;

    /**
     * @ORM\Column(type="datetime")
     */
    private $updated_date;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    private $description;

    /**
     * @ORM\ManyToMany(targetEntity="ChenXi\ContentBundle\Entity\Image", cascade={"persist", "remove"})
     * @ORM\JoinTable(name="gallery_image_xref", 
     * joinColumns={@ORM\JoinColumn(name="gallery_id", referencedColumnName="id")}, 
     * inverseJoinColumns={@ORM\JoinColumn(name="image_id", referencedColumnName="id", unique=true)}
     * )
     */
    protected $images;

    /**
     * @ORM\ManyToOne(targetEntity="ChenXi\MainBundle\Entity\Website")
     * @ORM\JoinColumn(name="website_id", referencedColumnName="id")
     **/
    private $website;

    public function __construct()
    {
        $this->images = new ArrayCollection();
        $this->updated_date = new \DateTime();
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
     * @param \ChenXi\ContentBundle\Entity\Image $images
     * @return Gallery
     */
    public function setImages(\ChenXi\ContentBundle\Entity\Image $images = null)
    {
        $this->images = $images;
    
        return $this;
    }

    /**
     * Get images
     *
     * @return \ChenXi\ContentBundle\Entity\Image 
     */
    public function getImages()
    {
        return $this->images;
    }

    /**
     * Set website
     *
     * @param \ChenXi\MainBundle\Entity\Website $website
     * @return Article
     */
    public function setWebsite(\ChenXi\MainBundle\Entity\Website $website = null)
    {
        $this->website = $website;
    
        return $this;
    }

    /**
     * Get website
     *
     * @return \ChenXi\MainBundle\Entity\Website 
     */
    public function getWebsite()
    {
        return $this->website;
    }

    /**
     * Add images
     *
     * @param \ChenXi\ContentBundle\Entity\Image $images
     * @return Gallery
     */
    public function addImage(\ChenXi\ContentBundle\Entity\Image $image)
    {
        $this->images[] = $image;
    
        return $this;
    }

    /**
     * Remove images
     *
     * @param \ChenXi\ContentBundle\Entity\Image $images
     */
    public function removeImage(\ChenXi\ContentBundle\Entity\Image $images)
    {
        $this->images->removeElement($images);
    }

    /**
     *
     * @ORM\PreUpdate
     *
     */
    public function setUpdatedDate()
    {
        $this->updated_date = new \DateTime();
    }    


    /**
     * Set created_date
     *
     * @param \DateTime $createdDate
     * @return Gallery
     */
    public function setCreatedDate($createdDate)
    {
        $this->created_date = $createdDate;
    
        return $this;
    }

    /**
     * Get created_date
     *
     * @return \DateTime 
     */
    public function getCreatedDate()
    {
        return $this->created_date;
    }

    /**
     * Get updated_date
     *
     * @return \DateTime 
     */
    public function getUpdatedDate()
    {
        return $this->updated_date;
    }
}