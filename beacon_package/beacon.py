from browser import document
from browser.widgets.dialog import InfoDialog


def click(ev):
    value = document["zone"].value
    document["result"].text = value


# bind event 'click' on button to callback function
document["echo"].bind("click", click)
