<?php
namespace ChenXi\LayoutBundle\Entity;

use Doctrine\ORM\Mapping as ORM;


/**
 *
 * @ORM\Entity
 * @ORM\Table(name="box_type")
 */
class BoxType{
	/**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="label", type="string", length=50)
     */
    private $label;

    /**
     * @ORM\Column(name="ch_label", type="string", length=100)
     */
    private $chineseLabel;

    /**
     * @ORM\Column(name="category_label", type="string", length=50)
     */
    private $categoryLabel;

    /**
     * @ORM\Column(name="is_cached", type="boolean", options={"default" = false})
     */
    private $isCached = false;

    /**
     * @ORM\OneToMany(targetEntity="BoxTypeProperty", mappedBy="boxType")
     */
    private $boxTypeProperties;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->boxTypeProperties = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set label
     *
     * @param string $label
     * @return BoxType
     */
    public function setLabel($label)
    {
        $this->label = $label;
    
        return $this;
    }

    /**
     * Get label
     *
     * @return string 
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * Set chineseLabel
     *
     * @param string $chineseLabel
     * @return BoxType
     */
    public function setChineseLabel($chineseLabel)
    {
        $this->chineseLabel = $chineseLabel;
    
        return $this;
    }

    /**
     * Get chineseLabel
     *
     * @return string 
     */
    public function getChineseLabel()
    {
        return $this->chineseLabel;
    }

    /**
     * Set isCached
     *
     * @param boolean $isCached
     * @return BoxType
     */
    public function setIsCached($isCached)
    {
        $this->isCached = $isCached;
    
        return $this;
    }

    /**
     * Get isCached
     *
     * @return boolean 
     */
    public function getIsCached()
    {
        return $this->isCached;
    }

    /**
     * Add boxTypeProperties
     *
     * @param \ChenXi\LayoutBundle\Entity\BoxTypeProperty $boxTypeProperties
     * @return BoxType
     */
    public function addBoxTypePropertie(\ChenXi\LayoutBundle\Entity\BoxTypeProperty $boxTypeProperties)
    {
        $this->boxTypeProperties[] = $boxTypeProperties;
    
        return $this;
    }

    /**
     * Remove boxTypeProperties
     *
     * @param \ChenXi\LayoutBundle\Entity\BoxTypeProperty $boxTypeProperties
     */
    public function removeBoxTypePropertie(\ChenXi\LayoutBundle\Entity\BoxTypeProperty $boxTypeProperties)
    {
        $this->boxTypeProperties->removeElement($boxTypeProperties);
    }

    /**
     * Get boxTypeProperties
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBoxTypeProperties()
    {
        return $this->boxTypeProperties;
    }

    /**
     * Set categoryLabel
     *
     * @param string $categoryLabel
     * @return BoxType
     */
    public function setCategoryLabel($categoryLabel)
    {
        $this->categoryLabel = $categoryLabel;
    
        return $this;
    }

    /**
     * Get categoryLabel
     *
     * @return string 
     */
    public function getCategoryLabel()
    {
        return $this->categoryLabel;
    }
}