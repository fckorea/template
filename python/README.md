# python template

## Setting virtualenv

* Install Virtual Environment
  * Linux
    ```
    (Based on Python3)
    $ pip3 install virtualenv
    ```
  * Windows
    ```
    (Based on Python3)
    $ pip install virtualenv
    ```
* Create Virtual Environment
  * Linux & Windows
    ```
    ## $ virtualenv *VENV_NAME*
    $ virtualenv venv
    ```
* Active Virtual Environment
  * Linux
    ```
    ## $ source *VENV_NAME*/bin/activate
    $ source venv/bin/activate
    (venv) $ pip list
    ```
  * Windows
    ```
    ## > .\*VENV_NAME*\Scripts\activate
    > .\venv\Scripts\activate
    (venv) $ pip list
    ```
* Deactive Virtual Environment
  * Linux & Windows
    ```
    $ deactivate
    ```
