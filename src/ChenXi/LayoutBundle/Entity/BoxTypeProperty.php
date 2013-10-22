<?php
namespace ChenXi\LayoutBundle\Entity;

use Doctrine\ORM\Mapping as ORM;


/**
 *
 * @ORM\Entity
 * @ORM\Table(name="box_type_property")
 */
class BoxTypeProperty{
	/**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="label", type="string", length=255)
     */
    private $label;

    /**
     * @ORM\ManyToOne(targetEntity="BoxType", inversedBy="boxTypeProperties")
     * @ORM\JoinColumn(name="box_type_id", referencedColumnName="id")
     */
    private $boxType;

    /**
     * @ORM\OneToMany(targetEntity="TemplateBoxPropValue", mappedBy="boxTypeProperty", cascade={"persist", "remove"})
     */
    private $templateBoxPropValues;

    /**
     * @ORM\Column(name="is_required", type="boolean", options={"default" = false})
     */
    private $isRequired = false;

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
     * @return BoxTypeProperty
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
     * Set isRequired
     *
     * @param boolean $isRequired
     * @return BoxTypeProperty
     */
    public function setIsRequired($isRequired)
    {
        $this->isRequired = $isRequired;
    
        return $this;
    }

    /**
     * Get isRequired
     *
     * @return boolean 
     */
    public function getIsRequired()
    {
        return $this->isRequired;
    }

    /**
     * Set boxType
     *
     * @param \ChenXi\LayoutBundle\Entity\BoxType $boxType
     * @return BoxTypeProperty
     */
    public function setBoxType(\ChenXi\LayoutBundle\Entity\BoxType $boxType = null)
    {
        $this->boxType = $boxType;
    
        return $this;
    }

    /**
     * Get boxType
     *
     * @return \ChenXi\LayoutBundle\Entity\BoxType 
     */
    public function getBoxType()
    {
        return $this->boxType;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->templateBoxPropValues = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
    /**
     * Add templateBoxPropValues
     *
     * @param \ChenXi\LayoutBundle\Entity\TemplateBoxPropValue $templateBoxPropValues
     * @return BoxTypeProperty
     */
    public function addTemplateBoxPropValue(\ChenXi\LayoutBundle\Entity\TemplateBoxPropValue $templateBoxPropValues)
    {
        $this->templateBoxPropValues[] = $templateBoxPropValues;
    
        return $this;
    }

    /**
     * Remove templateBoxPropValues
     *
     * @param \ChenXi\LayoutBundle\Entity\TemplateBoxPropValue $templateBoxPropValues
     */
    public function removeTemplateBoxPropValue(\ChenXi\LayoutBundle\Entity\TemplateBoxPropValue $templateBoxPropValues)
    {
        $this->templateBoxPropValues->removeElement($templateBoxPropValues);
    }

    /**
     * Get templateBoxPropValues
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTemplateBoxPropValues()
    {
        return $this->templateBoxPropValues;
    }
}