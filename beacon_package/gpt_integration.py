import re
import sys
import json
from g4f import ChatCompletion
from g4f.Provider import Bing, You
import g4f.models

g4f.debug.logging = False  # Enable logging
g4f.check_version = False  # Disable automatic version checking


def generate_gpt_response(input_message):
    # '[{"role":"user","content":"xin chào"}]'
    # convert string to list
    input_message = input_message.replace("'", '"')
    input_message = json.loads(input_message)

    res = ChatCompletion.create(
        model=g4f.models.default,
        # model="gpt-3.5-turbo",
        messages=input_message,
        # stream=True,
        provider=You
    )

    result_str = []
    for mess in res:
        result_str.append(mess)

    # convert list to string
    result_str = ''.join(result_str)
    # remove code block
    txt = result_str
    txt = re.sub(r"```[^\S\r\n]*[a-z]*\n.*?\n```", '', txt, 0, re.DOTALL)
    return txt


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stdin.reconfigure(encoding="utf-8")
    sys.stdout.flush()
    
    # input_message = [{
    #     "role":"user",
    #     "content":"xin chào"
    # }]
    # print(generate_gpt_response(input_message))
    if len(sys.argv) > 1:
        query = sys.argv[1]  
        print(generate_gpt_response(query))