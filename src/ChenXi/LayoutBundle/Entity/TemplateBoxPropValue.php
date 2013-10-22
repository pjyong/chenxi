<?php
namespace ChenXi\LayoutBundle\Entity;

use Doctrine\ORM\Mapping as ORM;


/**
 *
 * @ORM\Entity
 * @ORM\Table(name="template_box_prop_value")
 */
class TemplateBoxPropValue{
	/**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="TemplateBox", inversedBy="templateBoxPropValues")
     * @ORM\JoinColumn(name="template_box_id", referencedColumnName="id")
     */
    private $templateBox;

    /**
     * @ORM\ManyToOne(targetEntity="BoxTypeProperty", inversedBy="templateBoxPropValues")
     * @ORM\JoinColumn(name="box_type_property_id", referencedColumnName="id")
     */
    private $boxTypeProperty;

    /**
     * @ORM\Column(name="value", type="string", length=255)
     */
    private $value;


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
     * Set value
     *
     * @param string $value
     * @return TemplateBoxPropValue
     */
    public function setValue($value)
    {
        $this->value = $value;
    
        return $this;
    }

    /**
     * Get value
     *
     * @return string 
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set templateBox
     *
     * @param \ChenXi\LayoutBundle\Entity\TemplateBox $templateBox
     * @return TemplateBoxPropValue
     */
    public function setTemplateBox(\ChenXi\LayoutBundle\Entity\TemplateBox $templateBox = null)
    {
        $this->templateBox = $templateBox;
    
        return $this;
    }

    /**
     * Get templateBox
     *
     * @return \ChenXi\LayoutBundle\Entity\TemplateBox 
     */
    public function getTemplateBox()
    {
        return $this->templateBox;
    }

    /**
     * Set boxTypeProperty
     *
     * @param \ChenXi\LayoutBundle\Entity\BoxTypeProperty $boxTypeProperty
     * @return TemplateBoxPropValue
     */
    public function setBoxTypeProperty(\ChenXi\LayoutBundle\Entity\BoxTypeProperty $boxTypeProperty = null)
    {
        $this->boxTypeProperty = $boxTypeProperty;
    
        return $this;
    }

    /**
     * Get boxTypeProperty
     *
     * @return \ChenXi\LayoutBundle\Entity\BoxTypeProperty 
     */
    public function getBoxTypeProperty()
    {
        return $this->boxTypeProperty;
    }
}