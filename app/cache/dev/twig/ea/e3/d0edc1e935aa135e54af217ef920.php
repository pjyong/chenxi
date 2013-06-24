<?php

/* ChenXiMainBundle:Default:index.html.twig */
class __TwigTemplate_eae3d0edc1e935aa135e54af217ef920 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = $this->env->loadTemplate("::base.html.twig");

        $this->blocks = array(
            'stylesheets' => array($this, 'block_stylesheets'),
            'javascripts' => array($this, 'block_javascripts'),
            'title' => array($this, 'block_title'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "::base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_stylesheets($context, array $blocks = array())
    {
        // line 4
        echo "<link href=\"/app/css/bootstrap.min.css\" rel=\"stylesheet\" />
<link href=\"/app/css/bootstrap-responsive.min.css\" rel=\"stylesheet\" />
<link href=\"/app/css/jquery.tagsinput.css\" rel=\"stylesheet\" type=\"text/css\" />
<link rel=\"stylesheet\" href=\"/app/css/font-awesome.min.css\" />

<!--[if IE 7]>
  <link rel=\"stylesheet\" href=\"/app/css/font-awesome-ie7.min.css\" />
<![endif]-->

<link rel=\"stylesheet\" href=\"/app/css/ace.min.css\" />
<link rel=\"stylesheet\" href=\"/app/css/ace-responsive.min.css\" />
<link rel=\"stylesheet\" href=\"/app/css/ace-skins.min.css\" />
<link rel=\"stylesheet\" href=\"/app/css/daterangepicker.css\" />
<link rel=\"stylesheet\" href=\"/app/css/style.css\" />
";
    }

    // line 20
    public function block_javascripts($context, array $blocks = array())
    {
        // line 21
        echo "<script data-main=\"/app/js/main\" src=\"/app/js/lib/require.js\"></script>
";
    }

    // line 24
    public function block_title($context, array $blocks = array())
    {
        echo "CMS";
    }

    // line 26
    public function block_body($context, array $blocks = array())
    {
        // line 27
        echo "   <div class=\"navbar navbar-inverse\">
            <div class=\"navbar-inner\">
                <div class=\"container-fluid\">
                    <a href=\"#\" class=\"brand\">
                        <small>
                            <i class=\"icon-leaf\"></i>
                            Sunshine
                        </small>
                    </a><!--/.brand-->

                    <ul class=\"nav ace-nav pull-right\">
                        <li class=\"grey\">
                            <a data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"#\">
                                <i class=\"icon-tasks\"></i>
                                <span class=\"badge badge-grey\">4</span>
                            </a>

                            <ul class=\"pull-right dropdown-navbar dropdown-menu dropdown-caret dropdown-closer\">
                                <li class=\"nav-header\">
                                    <i class=\"icon-ok\"></i>
                                    4 Tasks to complete
                                </li>

                                <li>
                                    <a href=\"#\">
                                        <div class=\"clearfix\">
                                            <span class=\"pull-left\">Software Update</span>
                                            <span class=\"pull-right\">65%</span>
                                        </div>

                                        <div class=\"progress progress-mini \">
                                            <div style=\"width:65%\" class=\"bar\"></div>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href=\"#\">
                                        <div class=\"clearfix\">
                                            <span class=\"pull-left\">Hardware Upgrade</span>
                                            <span class=\"pull-right\">35%</span>
                                        </div>

                                        <div class=\"progress progress-mini progress-danger\">
                                            <div style=\"width:35%\" class=\"bar\"></div>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href=\"#\">
                                        <div class=\"clearfix\">
                                            <span class=\"pull-left\">Unit Testing</span>
                                            <span class=\"pull-right\">15%</span>
                                        </div>

                                        <div class=\"progress progress-mini progress-warning\">
                                            <div style=\"width:15%\" class=\"bar\"></div>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href=\"#\">
                                        <div class=\"clearfix\">
                                            <span class=\"pull-left\">Bug Fixes</span>
                                            <span class=\"pull-right\">90%</span>
                                        </div>

                                        <div class=\"progress progress-mini progress-success progress-striped active\">
                                            <div style=\"width:90%\" class=\"bar\"></div>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href=\"#\">
                                        See tasks with details
                                        <i class=\"icon-arrow-right\"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li class=\"purple\">
                            <a data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"#\">
                                <i class=\"icon-bell-alt icon-only icon-animated-bell\"></i>
                                <span class=\"badge badge-important\">8</span>
                            </a>

                            <ul class=\"pull-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret dropdown-closer\">
                                <li class=\"nav-header\">
                                    <i class=\"icon-warning-sign\"></i>
                                    8 Notifications
                                </li>

                                <li>
                                    <a href=\"#\">
                                        <div class=\"clearfix\">
                                            <span class=\"pull-left\">
                                                <i class=\"btn btn-mini no-hover btn-pink icon-comment\"></i>
                                                New Comments
                                            </span>
                                            <span class=\"pull-right badge badge-info\">+12</span>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href=\"#\">
                                        <i class=\"btn btn-mini btn-primary icon-user\"></i>
                                        Bob just signed up as an editor ...
                                    </a>
                                </li>

                                <li>
                                    <a href=\"#\">
                                        <div class=\"clearfix\">
                                            <span class=\"pull-left\">
                                                <i class=\"btn btn-mini no-hover btn-success icon-shopping-cart\"></i>
                                                New Orders
                                            </span>
                                            <span class=\"pull-right badge badge-success\">+8</span>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href=\"#\">
                                        <div class=\"clearfix\">
                                            <span class=\"pull-left\">
                                                <i class=\"btn btn-mini no-hover btn-info icon-twitter\"></i>
                                                Followers
                                            </span>
                                            <span class=\"pull-right badge badge-info\">+11</span>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href=\"#\">
                                        See all notifications
                                        <i class=\"icon-arrow-right\"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li class=\"green\">
                            <a data-toggle=\"dropdown\" class=\"dropdown-toggle\" href=\"#\">
                                <i class=\"icon-envelope-alt icon-only icon-animated-vertical\"></i>
                                <span class=\"badge badge-success\">5</span>
                            </a>

                            <ul class=\"pull-right dropdown-navbar dropdown-menu dropdown-caret dropdown-closer\">
                                <li class=\"nav-header\">
                                    <i class=\"icon-envelope\"></i>
                                    5 Messages
                                </li>

                                <li>
                                    <a href=\"#\">
                                        <img src=\"assets/avatars/avatar.png\" tppabs=\"http://easy-themes.tk/themes/preview/ace/assets/avatars/avatar.png\" class=\"msg-photo\" alt=\"Alex's Avatar\" />
                                        <span class=\"msg-body\">
                                            <span class=\"msg-title\">
                                                <span class=\"blue\">Alex:</span>
                                                Ciao sociis natoque penatibus et auctor ...
                                            </span>

                                            <span class=\"msg-time\">
                                                <i class=\"icon-time\"></i>
                                                <span>a moment ago</span>
                                            </span>
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a href=\"#\">
                                        <img src=\"assets/avatars/avatar3.png\" tppabs=\"http://easy-themes.tk/themes/preview/ace/assets/avatars/avatar3.png\" class=\"msg-photo\" alt=\"Susan's Avatar\" />
                                        <span class=\"msg-body\">
                                            <span class=\"msg-title\">
                                                <span class=\"blue\">Susan:</span>
                                                Vestibulum id ligula porta felis euismod ...
                                            </span>

                                            <span class=\"msg-time\">
                                                <i class=\"icon-time\"></i>
                                                <span>20 minutes ago</span>
                                            </span>
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a href=\"#\">
                                        <img src=\"assets/avatars/avatar4.png\" tppabs=\"http://easy-themes.tk/themes/preview/ace/assets/avatars/avatar4.png\" class=\"msg-photo\" alt=\"Bob's Avatar\" />
                                        <span class=\"msg-body\">
                                            <span class=\"msg-title\">
                                                <span class=\"blue\">Bob:</span>
                                                Nullam quis risus eget urna mollis ornare ...
                                            </span>

                                            <span class=\"msg-time\">
                                                <i class=\"icon-time\"></i>
                                                <span>3:15 pm</span>
                                            </span>
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a href=\"#\">
                                        See all messages
                                        <i class=\"icon-arrow-right\"></i>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li class=\"light-blue user-profile\">
                            <a data-toggle=\"dropdown\" href=\"#\" class=\"user-menu dropdown-toggle\">
                                <img class=\"nav-user-photo\" src=\"assets/avatars/user.jpg\" tppabs=\"http://easy-themes.tk/themes/preview/ace/assets/avatars/user.jpg\" alt=\"Jason's Photo\" />
                                <span id=\"user_info\">
                                    <small>Welcome,</small>
                                    Jason
                                </span>

                                <i class=\"icon-caret-down\"></i>
                            </a>

                            <ul class=\"pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-closer\" id=\"user_menu\">
                                <li>
                                    <a href=\"#\">
                                        <i class=\"icon-cog\"></i>
                                        Settings
                                    </a>
                                </li>

                                <li>
                                    <a href=\"#\">
                                        <i class=\"icon-user\"></i>
                                        Profile
                                    </a>
                                </li>

                                <li class=\"divider\"></li>

                                <li>
                                    <a href=\"#\">
                                        <i class=\"icon-off\"></i>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul><!--/.ace-nav-->
                </div><!--/.container-fluid-->
            </div><!--/.navbar-inner-->
        </div>

        <div class=\"container-fluid\" id=\"main-container\">
            <a id=\"menu-toggler\" href=\"#\">
                <span></span>
            </a>

            <div id=\"sidebar\">
                <div id=\"sidebar-shortcuts\">
                    <div id=\"sidebar-shortcuts-large\">
                        <button class=\"btn btn-small btn-success\">
                            <i class=\"icon-signal\"></i>
                        </button>

                        <button class=\"btn btn-small btn-info\">
                            <i class=\"icon-pencil\"></i>
                        </button>

                        <button class=\"btn btn-small btn-warning\">
                            <i class=\"icon-group\"></i>
                        </button>

                        <button class=\"btn btn-small btn-danger\">
                            <i class=\"icon-cogs\"></i>
                        </button>
                    </div>

                    <div id=\"sidebar-shortcuts-mini\">
                        <span class=\"btn btn-success\"></span>

                        <span class=\"btn btn-info\"></span>

                        <span class=\"btn btn-warning\"></span>

                        <span class=\"btn btn-danger\"></span>
                    </div>
                </div><!--#sidebar-shortcuts-->

                <ul class=\"nav nav-list\">
                    <li class=\"active\">
                        <a href=\"#dashboard\">
                            <i class=\"icon-dashboard\"></i>
                            <span>控制板</span>
                        </a>
                    </li>

                    <li>
                        <a href=\"#\">
                            <i class=\"icon-text-width\"></i>
                            <span>收件箱</span>
                        </a>
                    </li>

                    <li>
                        <a href=\"#\" class=\"dropdown-toggle\">
                            <i class=\"icon-desktop\"></i>
                            <span>内容</span>

                            <b class=\"arrow icon-angle-down\"></b>
                        </a>

                        <ul class=\"submenu\">
                            <li>
                                <a href=\"#/content/article\">
                                    <i class=\"icon-double-angle-right\"></i>
                                    文章
                                </a>
                            </li>

                            <li>
                                <a href=\"#/content/page\">
                                    <i class=\"icon-double-angle-right\"></i>
                                    页面
                                </a>
                            </li>

                            <li>
                                <a href=\"#\">
                                    <i class=\"icon-double-angle-right\"></i>
                                    相册
                                </a>
                            </li>

                            <li>
                                <a href=\"#\">
                                    <i class=\"icon-double-angle-right\"></i>
                                    音频
                                </a>
                            </li>

                            <li>
                                <a href=\"#\">
                                    <i class=\"icon-double-angle-right\"></i>
                                    视频
                                </a>
                            </li>

                            <li>
                                <a href=\"#\">
                                    <i class=\"icon-double-angle-right\"></i>
                                    表单
                                </a>
                            </li>

                            <li>
                                <a href=\"#\">
                                    <i class=\"icon-double-angle-right\"></i>
                                    投票
                                </a>
                            </li>

                            <li>
                                <a href=\"#\">
                                    <i class=\"icon-double-angle-right\"></i>
                                    挂件
                                </a>
                            </li>

                            
                        </ul>
                    </li>

                    <li>
                        <a href=\"#\" class=\"dropdown-toggle\">
                            <i class=\"icon-list\"></i>
                            <span>多媒体</span>

                            <b class=\"arrow icon-angle-down\"></b>
                        </a>

                        <ul class=\"submenu\">
                            <li>
                                <a href=\"\">
                                    <i class=\"icon-double-angle-right\"></i>
                                    图片
                                </a>
                            </li>

                            <li>
                                <a href=\"\">
                                    <i class=\"icon-double-angle-right\"></i>
                                    音频播放器
                                </a>
                            </li>
                            <li>
                                <a href=\"\">
                                    <i class=\"icon-double-angle-right\"></i>
                                    视频播放器
                                </a>
                            </li>

                        </ul>
                    </li>

                    <li>
                        <a href=\"#\" class=\"dropdown-toggle\">
                            <i class=\"icon-edit\"></i>
                            <span>网站管理</span>

                        </a>

                        
                    </li>

                    <li>
                        <a href=\"#\">
                            <i class=\"icon-list-alt\"></i>
                            <span>模板管理</span>
                        </a>
                    </li>

                    <li>
                        <a href=\"#\">
                            <i class=\"icon-calendar\"></i>
                            <span>插件</span>
                        </a>
                    </li>

                    <li>
                        <a href=\"#\">
                            <i class=\"icon-picture\"></i>
                            <span>用户</span>
                        </a>
                    </li>

                    <li>
                        <a href=\"#\">
                            <i class=\"icon-th\"></i>
                            <span>工具</span>
                        </a>
                    </li>

                    <li>
                        <a href=\"#\">
                            <i class=\"icon-file\"></i>
                            <span>设置</span>

                        </a>

                        
                    </li>
                </ul><!--/.nav-list-->

                <div id=\"sidebar-collapse\">
                    <i class=\"icon-double-angle-left\"></i>
                </div>
            </div>

            <div id=\"main-content\" class=\"clearfix\">
                <div id=\"breadcrumbs\">
                </div><!--/#breadcrumbs-->

                <div id=\"page-content\" class=\"clearfix\">

                </div><!--/#page-content-->

            </div><!--/#main-content-->
        </div><!--/.fluid-container#main-container-->

        <a href=\"#\" id=\"btn-scroll-up\" class=\"btn btn-small btn-inverse\">
            <i class=\"icon-double-angle-up icon-only bigger-110\"></i>
        </a>
        <div id=\"myModal\" class=\"modal hide fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">
  <div class=\"modal-header\">
    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>
    <h3 id=\"myModalLabel\">头部</h3>
  </div>
  <div class=\"modal-body\">
    <p>身体</p>
  </div>
  <div class=\"modal-footer\">
    <button class=\"btn\" data-dismiss=\"modal\" aria-hidden=\"true\">关闭</button>
    <button class=\"btn btn-primary\">保存</button>
  </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "ChenXiMainBundle:Default:index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  69 => 27,  66 => 26,  60 => 24,  55 => 21,  52 => 20,  34 => 4,  31 => 3,);
    }
}
