# Py Files Generator

## Introduction

This extension help Python developers to generate a module/submodules tree filled with the __init__.py file.

The extension can also be customized with a set of generators each one with a list of files to generate.

By default, **Py Files Generator** generates a directories tree and put a `__init__.py` file in each.


## Create custom generators

You can add your custom generators by adding them to your settings file.

![Image of custom settings](images/2.png)



## Usage

To activate the extension right-click on a folder in the explorer pane: 

![Image of Context menu](images/1.png)


Choose `Python files generator...` from the context menu.

From the quick pick menu choose the generator you want to use:


![Image of quick pick](images/3.png)


### Generate python modules

Choose `Python modules` from the quick pick menu and then type the path you want to generate:

![Image of input for path](images/4.png)

Type `enter` and the modules will be generated.

![Image of generated modules](images/5.png)


### Invoke custom generator

Choose the generator you want from the quick pick menu. For example choose `Django App files`:


![Image of generated modules](images/6.png)

And your file will be generated.

![Image of generated files](images/7.png)