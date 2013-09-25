<?php

namespace ChenXi\ContentBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

use ChenXi\ContentBundle\Form\DataTransformer\DatetimeTransformer;


use Symfony\Component\Form\Extension\Core\DataTransformer\DateTimeToStringTransformer;

class PageType extends AbstractType
{

    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $datetimeTransformer = new DatetimeTransformer();
        $builder
                ->add('title')
                ->add('body', 'textarea')
                ->add($builder->create('start_date', 'text')->addModelTransformer($datetimeTransformer))
                ->add($builder->create('end_date', 'text')->addModelTransformer($datetimeTransformer))

        ;
    }

    /**
     * {@inheritdoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'ChenXi\ContentBundle\Entity\Page',
            'csrf_protection' => false,
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        // Empty string to map all fields at top level
        return '';
    }

}