# JavaScript 执行原理、闭包、垃圾回收、立即执行函数

本章节，我们将学习 JavaScript 执行原理相关的内容。首先，我们要知道 JavaScript 是一门解释性语言，也就是边解析（编译），边执行。

你可以理解为一段 JS 代码在正式执行需要被 JavaScript 引擎编译，编译完成之后，才会进入执行阶段。

![image-20221016201347158](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAr0AAABACAIAAACY1VhhAAAccUlEQVR4nO3df1xUVf4/8Nc5597h9w9BBAQVRUSFFMXUFE2i0rLNLEvLtlzb/LR97fP92KPdrba2rT6t7la2ZeuuuZlbWdmPLcpK08y01FLyR/7+BSgKiIiAIMy995zPH3cchmHA0VSQ3s/HIxqud+49zJz3nfc9v4YppUAIIYQQ4gfe2gUghBBCyCWD8gZCCCGE+IvyBkIIIYT4i/IGQgghhPiL8gZCCCGE+Evzc7/77rtvw4YNF7QopAVDhgyZO3dua5eCtIRipHVRjLQDFESty88gYn7Ow8zMzPzJRSI/SV5eXmsXgbSEYqTVUYxc6iiIWp0/QeRve4PriMuCzrUw5Nxljj7V2kUg/qIYaRUUI+0JBVGr8D+IaHwDIYQQQvxFeQMhhBBC/EV5AyGEEEL8RXkDIYQQQvxFeQMhhBBC/EV5AyGEEEL8RXkDIYQQQvxFeQMhhBBC/EV5AyGEEEL8RXkDIYQQQvxFeQMhhBBC/EV5AyGEEEL8RXkDIYQQQvxFeQMhhBBC/HV236N98RkGKqtVYZHcX6DCw1hOljhVB6mU5z6CIzSEMXYeTmdZeOlVo6pa3XCNlpHGLYmXFxibt1s5Wdpdt2rffG8dLlE3Xy8ceksnqz0Fp6Gabg8MYIEB56GQ5Gdo6w751ofmxHFa/76cn872d+2Ti/5jFhxSMx91JMZ718ntu+XKb+U9t4vgIGZZqKn1DhxPdhBJ6b0bZywkGEIAwKq11oJ3jOgO/OHpemyMjxCoq8eJSlVYJPfmqx7d2JABoulJHToLpi9JJq1hzgJz4WLjjw/q40a7Pvhyl5lPzTbGZIvHZzhauDgfO66enWtMHKcNSOdn/KBpGmvtL4jabt5gv6OeW/r24j26sWdeNLbtkp7bm77rhoGlq6zDxTI8jN00RnO/xEdK1bKvrPU/WKfqFIDYGH71CJE9nLvzgOKjas13srBI9krmmf24YaK8Qm3frS7PwN58+fQLRnmF2rlXPThNjwhHVTVmznEeLmlUmIw0YZh492Oz6V/0l8ccV48QP/2VIT83loUvvraWr7Y6RrGoSJQcdV1Eio/i2w1WZRXe/tAcOdSVTYSFstRkXlgkf/+Ms7hU6Zq6d7J+8LB64LH64tJm8wY7iIpLvXeLj2Vz/jege1dWVq5ef8/cvltpmrU3X/O65NlXZM8tV2WJiDBml8Fz+5SJ+gNT2+5lhxAvlVWYPc9YscZavd766+OODhHsr3OdPvfMSBPTp+qHi9t/EF0aAZwQx+Njkd5b1J4CAE1DUiILCEBNLQoO+bgUWhLr86ylX1npvfn1OSI4iCmFT1eYz7xoOD3el+27raPH1JCBDofu2rJuo1VYJGOi2aD+HECAAzHRrrc2pTuf+aj+xHPGkuUmgIena1LhSKnavrtRAbp0VqEhvv+KDhE/8WUgF5UsPswiIllwM2/nRXTgoFyxxoqPZbeM1TZvt7zyaQDv5Jrv5Loe2xlA9658wlhtzgLjtcVm5zjevy9LSmScsbJy2b0r007H/YlKZie+msbczRgOHd27snonCg4pwcG5siz2wafmlh0SgGli9jwjvpOenOS7lzOpC0uIY7178pM1DUfTtIZzkZ8JdbSERUQiILC1C3LuSsvUUy841+dJAHffpg0bJDZvt7yu+W5dOit5uoK37yBq63mDV1vC0WPKMBATzWb9IaB7V5a31Zr2W6eUUEoBLbUfbdsln59nOg04dIwbow0ZwKtrsGGzVVrWsE9VNb78xgIwbJDolsgAMAYhXIdlDJn9xKxH2cJ3zWl3iqBAJoSaMU0vOKReetUpOJs+VYuLYWGhLCGO3zFeKsXCQiEEysrVI392VlYhNIRGk1xK5A8bnHNn84GDtZFXiaFZLCy8VYphWchdapWVqwem6kld2NadADByqEhN9q7wJUfVJ8st+zFjuO1GkX9IrV5vAUiM57+apP32aadUuO4q7Y7xmhDYvls+OdsAkJbKpk7S3Nlzr2T+4tOO5V9bs1420nvzTh3Zp19ary02NQ2/u19fu1GuWmv95e/mnx/RO0Y1KoPXbdDu/aq+3nW0yHCWu8x8ara0LKUUzkuvImnjjKVLzPcXiUFXiCtzxOVDWysFdxqu7uaSowDw6lvW8q+tMdnau58YJyoZgLUb5b0P1TOmcLrNwI4FO0D2F0hNwz2361MmCiHQMYrfO9n352ZCPBenr/HtO4jaet5w7LjauEXqmgLQK5nvOaD2F8rePXmHyIZ9Vn5rHSiU11wppk7SeTMfzdt2y6pqBWD6VP2O8Zr9it94rag9hQCHa591edaGzRLAmOyGngtNAEDJUVl7Spkmi4xgN18vvv1e9kpGRhrPSGPHjluVVRgykF01XISFMgCFRfK/H3NaEnbbVMUJ1NUjIADu6zK5VKj6emvdGmvdGmiayBikXZkjho1kEZFnfub5s2OP/PRLKzWZDbucv7bYPHZcARgykI/J9u7z2rpDuvMGAMFB7MFp+q8makldGICMNPGrifrLrxl/m29s3i67JbK3PzSdBtJS2dO/C7ATZbe6OmzeLgGMHCp+3ClfeMUwTdwyVvvFtSItlW/fLfO2Wk88p/44w+HZ1lpcKr/7wQKgaaxXD7Zpm3X8hBo8gAcGNOyzONf8fpN1x3jthmva+sWH/HSqttZc/aW5+ksEBIrMwdqVOWLIcBYadjHLIKWru9n+9XCJlIqdrMX23QpQAKqq1Y5q17+62wyUwv5CVVgkNQ0P3adnDxeWBejolsjuu8uvS3k7DqK2Hrobt8iNW+rtx4884Hj7I8M0kZHGw0IYgPAwFhPNysrVvgI16SbeXNIA4FSd60FdfaPt7qEPZeVqcW7DoIRd++Sx49hzQO45IAEs/cpa+pXl+cQpE/WMNG4YWJ9nAcjsJ0JDXO+rlMySCAyAw6EAVlmtyspVrx48onXuV8n5YJrWxvXWxvV4YaboN0CMyNaGj2IdYy70aQ0DucvMqmqVnioW51pLVpimCQDPzjWenevdW+GmlKo+CUsCQFQkkxKcQwhMGqdZFuYsMFatdVXmYYPEnx7Sozt437kcLpFbdsjUZHaqTj3/T7OqWmX2E9Pu1Bw6S01m90/Rn3nRuT5P/tfv6h+f4cjs5wq8ZausZassAPGx7K4J2rw3TAAZadxuL4yJZpoGp4Hd+1WnjtTg8DNTX2etXW2tXQ1db0jBwy9G362uYfLN2o3Xitxl1rJV1i8naCOGiJhozJ3pWJcn33jfHNSf/3KCvnGL9cb7DR8BjGFsjjheoffoxgak8z89b+wvkL+f7hg68MxDI23tOIjaet6QnMRHDuX2Tf+g/rxjlP7Bp9YvJ2j22NSU7vzfLwYUHJIAeiW31AvQuyfTNJgmXnnTOHZcTZ2kuQcuALAsuHueAFSdxN8Xeo++tNn9TCk9RHoqA1B6TP3wowKgCXy/yQKQ2JkdP6GKS1V6bx4SzAA4nco0wTlaSGv84Xx9PlMAlFKKAUopKDC7iwYKANTpn+7Bt+4tUFCnf214rKDQsIPr2AoAU1BQcJ+o0aHOcBylwOB6PnNtaPE4XoVs9Nir2F5/psfGJlvsV8m9s2ru4Gh8HM8jVFf5eBuktDbnWZvznHOeY6Gh2oTJ2tVjeFxnv97Cs6dpiI/lgLV2owUgPIwNzuAr1lg++ylsCfHcNDHrZcPOdNN782cfd+zYI9flWes2Kq/O0bUbrevvtJISWe8Uccf4holCW3ao4lI1IF2sz5PlFSo5iT88XbMbVBnDL64RgOOZF52V1Y1a0fr35YMH2AOD2MihgjFs2y3HXu1qF7kiU7w7L6DkqNI01rvnBemzc74+3x0U3qFxhjDxrAzN1UZ7B6XsAFEKsOuYXdVd1Q6A5+PGwWKXofmqaNdb1/+BZgLHfXzvf20paho9dsXm6YuJ5wuiAHY6kH0c1udPz1fY41VVJyp8vEmGYW1YZ21YB8ZYaJg+9T5t+JUsqmOLb+xPIgT69uIAvt+sAKt7V2Z/SHdNwPY9CkDPJH5FJi+v8L7gC4EpEzXLwvxFxqq1VnAQ6uvVC68Ym7dbTc9iy8nSRg51VfhLNIj8ccHzhs3bpX1H7r+hmSIjzfWKpHRnv75Dt1OtsnKVf1ClpbL3l3jPVggPY5f1aSn5GjJA/GqiNn+RaZp492PzP5+Z12WLe+/UE+IYgN375eKPGwoZGMAS45lhsIR4HhKET5ZbsTFs1qOOPilc93iDlcKK1VZhkQTw0quum78/PqhHd+AAdA0/7pQOHevyJIDAAGzbpdJS0SHiHJNE4/V/ndsTyQWiTp40Fs4zFs7jqX20rOwugh2ymp2wcG4Yw7jRIj2Vf77S/GS5dctYEd+JrVhjdUtkA9J9XzUCApjXdEtdR0mZen+J3fiJjDR++01acBDeX2Kt+c5yGthXoBwOGRWp2YOwDEPtPSABdI7lV2Xx4yfQvy/74msrNVllDxdl5WrJcquuXt07WTt+Aqk9G+rzgMvEfXe5LimFRaq8QsV3Yq+/5x2tCfG8X5/z9Qo1QjFyKVFKVVc5X/yr86VnRXp/kTVKy8q+OGeuPYV6p6qsQk0tAAQGMtHMRDcp8cly87XFJoDJN2uD+ovlq5sdFwng8gzXg0s3iPxxwfOGwiI5f5GPSYktiI9l7rzBc8TK+Ov0Dz4zfc4lc8+baO6YQmDq7VrnOP7yAqO8QpkmPllufb1ePjxdv/ZKIQTTBOJjWU0tqqpVUKB65mHXqIf8g2rjVllZpTiH3rhX63CJ+myl61qclMgqKlFeoQDYeeumbXLTtobpOnaHyyvPOjL70VRMchY6RrEDhfLr9TI5id80RsvbagF4433zjfd975/em//tKcfD0/XRo8SMJ5wAGMOYbAGwlO7o1YMrxez5w3fdqs981HHsuDpwUBmG6hjFTtYoALrOJtwgftwlc5eZOSMcc2c6/vG6uWCRMWWinj0cJ2tgh2HTyvzJF+aGzSaA8FA2aphoLvDHZItrRgoa7UMuDqVQfRKFRbK4VAJ4arbx1n/MtFTx+UrT4QCAjlG+nyglPv7CnDnHME3Ex7LRo7QAB4Zmii6dGz5ovt8kt+yQ7nZxdytg+w6itt5P4TliZeokPPmQo6JSAQgLAQBLYnGu+c33MiQY4kxtNg6d3XituGYkX75aLnjbOHREVVWrF14xenRjMdGsZ3f2ywnavDfMbbsa5SUdIhHdgRWXqsIimd670TnKK5RdEe35HUtWWPbs25BglpbaKIOpr0dBkXLoCHCce4+Ufte9AMAAxhgYGBSYvdyVsn+3u928fzLXRBPmeqYCA2PM1cbK7M2u2SjM3vn0T8/jeB7W3qGZUzQ6gusnc5W84dTMPrlylcDnKU4/y/NETQvZqEiNTmH/ecr1VzLlekbLhWwoqrl6pfH6/BbeEZHWT2SNEiOy7X6KQ8+95M/7eLaOHVf/esuqqla/vkMLD2V2kwCAQf35+Ou0V950rdywer2cdqf24edmXT0YQ1goCwluOEhwEDtSIj/70gJgmsg/qJwGXvqX+fp7rnaynCxt5NCG/ZO68Jws8eYH5jffy149/G0OLa9Q5RUAEB+L7l353JmOikoEBiAoEABO1eFfb5k798qgwDNH67mxY8Su0q7x5j7e3BZ/2jufrs8Mdv2BO3bsgypXLWvY0jC6nTV+7GNL8/HS6ClNtpyuz+6QUTgd+MzjdE3D0/cB7f+aBM7pi4Jy7ctUw1UC3gVuLo4AMGZ+/L6R20x6C0AI0W+ANvIqcYH7Keqd+MvfnZ4D1GpOofiodBqwp+WHh/p4lmXho6XmX+capscHt67b/QsNn/SGaW7ZIT3bxfMPuj5BLtEg8scFzxvGjdbci3OdA3vEins+xZES9cqbZp8U/vv/pwUHsR93yq07FYDRo1xzGWyGoez0oqmgQHbjtSInS8x62fnZl1ZZudq2S429mv/3PXpcJx8f6sFBLKkL37ZL7s33nvqS0p0NzRQrv/Huhbl6hPBa3yn/oHrgsXoA9oiHc+O469fn/FxyDvj2rb628os5LhLAV99adhvD7HnGF19bifFM06AJdIxiGWk8LBTduzIAm7YhI42v+Y4VFfuo+V5Dym2HS+ThEtdjd/uqTQhc1ocD2F8gT1SpkqN+TRkfPUqMGy3QMBRczZ5n3Hy9uHeyLgRWrLH25svgIFx7pdAvzI0SxUjbEtHBx8aLPi7ScxkeAL+5W594owgJZh9+bv75JQPAc/80LcnMxjf2nONEFUwTwUGw1w06W5doEPmjrbc3dIxig/rzwABYFurqwbmqqlZLlpuhweq2G7U5C8yqajU0k2cPa/SHlJSpA4UKQFIXbnde1J5CUGDDp35IMAb15/btV8lR5dDRJ4WfqPJxwXXosKeo7TkgT9aosFDmNJRhsJBgBAexKbdpB4tkjUetqjiBR/7caBHJjDRxfQ71TVzi3PMwrxjBIn1dDS+YPincvnJFd2BhISgrR0w0i4rE3nz15gdmaZlatVYCKC1Tb35g7s1XQU1W2VEKuoaHp+u/vV8HUFml/jDL2LlX/vZ+3T2Zs+nS6fZNWFGxqjs9F8mzAcOn+Fg+ZKAAYBgwTHDOKqvVa4vNkGA2eACfu9A0TYwbrWU0MzKDtGf2PMyROWLoxZ6HyRhu/YV2z+3awnethYuNmGjYN5mV1a4dqqrVk8877fwbwIlKxTk6dWRZg8XhYjXscv77//W9QOQZtdcgaqN5w/4CtWOPArB2o5w6oz7/oHQaGJMtHvsf3Z6+8k6u9U6uBaBbIn9wmh4eBgCr11tRkcySWPC2UVauAKSnMnuo6pffWHlbrEk3aUlduK6h4JDMXepqJ0jpcYY2gP59mabhx53ywEHVvy87dFj9YZbzthvFDdeIhHgWGMhqTjUkHE0XkfRcRIxcWlhAQKuv+9S3F1/2dpCd9R4/of7/484eXRmAbzfI/QUSQFm5qya//ZEJwKs3ra5OLc41e/fkYaHMNBWAk7Wu+6eSo2r3PlfV9ByeXVOrHp3p/O4HCSCpC3caym56jfXVlmxZ2LlX2nOaPvnC/OY7s6BImSamTNTvv1uzByP/bb6rN8Q9D+38vkSkzWLBwa2+7hMAe/y7p7Jy9dW3FoC7b9MYYyVHZVoqf/6fBoD8Q+p3T9fPmKaPv0577H/0TdvObly/rX0HURvNGz5badmTJqqqVdXp8Q1xnXhQIBuTLfbla4v+42pUGj2Kd0lwvYJbdqiFixsSw8x+Inu463ZKSvXJcstzVRzb0Ew+OOMMjQEp3cWAdL5hs/x0hdUnhRUfxd58uWQ5rh6h2XOQysrVw8/UV1QCQIADo0eJKzIbrt0J8fxkjSorV106M3tFh3N8UcjFxQdeHvTe5627zrRhYOtOa8sOVVik9h6w7HEJk8aJE1XIyRL33KE9/YJxwzUCwJLl1uMz9FffMkuPNWo221eg9hWYE24Q326QXmOKPQdX2kvo249Dglnvnvy7H2R0BzY2h+/cq3bvl8FB6Jbo4xbHMPH2R6a9IIS7axZA1wQIgck3a3vzlXu5iF9cK6Iiqf7/XOhjbnBMvLMNrjOtFD5dYe3YI2Oi2XVXieRu3LTw404LQFGxqqyStacgRKNxKWerfQdRG80bAgOQEMcPl0h7fEN8J8REc6Xw8RfWog+MfQUNl79X3jRXfmNNvkUfdUXDx7+mISdLzJjWsIRnQhzvmcQ8nxgexm69QUy+2dVW0YLwMORkiQ2bZe4ys1cPfuCgBNAnhYcEo7oGAEwT7iOHhsAez1FRqQ4Uym6JnHMs/coyTYQEs58yvoFcZDw+obWLAACfr7Q+/LxRvpuRLlattXQdEWFMCNeAKSEQEcY8uzztRBauRUdEXAyvdyoAdfVY+pVVVq48F4EIcLDQELgHXeZkibE5omsCP1Iqn/unAWBopujRzXftDQ1BdAdWXqHsrtmEeB4eyuqd6vX3zHdyzdKyhqD703PO3KX8zlu0wQN4C7OfSPvAOsW1dhEa1J5yDWMHsGGz9e/3TABXjxA9unLO4eAIDeFRkezgYWVPYYj3NdwNgFI4WaOUYqEhKD4qN/3YwloO7TaI2mjecO9krVNHPDVbusc3FBbJB//kdH+L1ahh4o7x4q0PrVVrrX0F6snnnbX36/ffLe6+VZNKNf3G6kH9+eJ5gXX1qKtXADhjoSFnsRBTzgjx5TfWhs1y5hwnAE3D8MHcPeU3KpJNn6p994O01/mynajEE88Znnd4nToyWmqanBVdx5CBIiaa9erBAwPZzJcMh0P16MpWrfXes7RMzV9krt0ouyYwAFLCXrgsPpY9+ZA+8DLhvnM6UaU2bZNl5WrUMO41ZtmehwkgIZ5FhrOKSjXrZWN/gQwPY5PG+Z7nHBiARx5whIaYCxcb7q7ZzdvljCecdkuhpuHm67Wswfy1d8xN2+SmbfLHXc7nnwjIGkx5A7lI3v7IfO4frnb+Pfvla+/IqmrVLZFPuEFzX8bjO7HkJLZhs6yqRveuLKHJF9O7/fs987V3Go2ijI9l7u8rcGvHQdRG84amuiXy39yt/2GWs3dP/pu79MEDOOcYkC42bZPzFxlV1Sp7mBCChYehhY6AwAB4rvLtv6hI9vgM/ekXjNNfYKHZK0xwxjrHsrAQDLxMnKhEUbF0tyhEhKNDBHPnDX1S+JTbNLrHImfrmpGueV/bdslOHZHZT4uPdSW8jKFzLAsJZn1S2NirxcLF9pK0IiyEcY6bxmgFh9SMabrXd0/4LzKc3XWrvi/f+cA9+sDLzmJsb/++/O5btTkLjKzB/Dd366nJnDFcnsHXbpD/+LeR2Jm7F2gh5CLok8Lt9YJTk/nt4/XLM+QzLxr3T3F9dYstPAxTJ2m79xtV1Wr0KC0uxncVZQwZaQJoyBuGZvJJ47TmejTaZRC5Viw9o8zMTAB5y4LOuOf5crhEFh1RYaEsNdl1Z+80VFk54jsxr3YCpWCY5+Fbo6TEyRpIpUKCmM8pLpaF4qPqZI1K6c6bW1/sQsgcfQpAXl7exTslOXsXIUYsC0pBCFfDQGgIc1+tKipV0RGV2JmFhzYsfmdZaFpRnYbasUfV16vEziwhrlEs1dRi1z4pBPr2Yu6BV+UVKjK80TFrar3DZH+BOnZcdoziyUnMfaiaWhUTzbyup1LCtM7/d7xRjLQPFyiI7EoLwG5mVgpHj6mYaO+PEriGF6jkbg1XeMNAzSnFGQsJdkWTOwQACN4oDPHzCKK2296QEMcTGveOOXSW4Ku/jLHz8wpyjpabK4RAYjyjgY2ktbivO56rldg6RLCmS5j7zG4dOstI812HQ4Lh/n4dN69vvRLCR5gkJ7HkpEYnCwn2vVqJ3ZdMyMV0utK6MAbPr6D0FN2BeVV4XUekfuYQcPs5BBFFMCGEEEL8RXkDIYQQQvxFeQMhhBBC/EV5AyGEEEL8RXkDIYQQQvxFeQMhhBBC/EV5AyGEEEL8RXkDIYQQQvxFeQMhhBBC/EV5AyGEEEL8RXkDIYQQQvxFeQMhhBBC/EV5AyGEEEL8dXbfh3nbf9VdoHIQ0j5QjBDyE1EQtXH+5g2dO3c+cuTI/gJ1QUtDmtOpU6fWLgI5A4qR1kUx0g5QELUuP4OIKeXXO1ReXn7s2LGfViRy7uLi4iIiIlq7FKQlFCOti2KkHaAgal1+BpG/eQMhhBBCCI2LJIQQQoi/KG8ghBBCiL8obyCEEEKIvyhvIIQQQoi/KG8ghBBCiL/+D8+wQX51nVfOAAAAAElFTkSuQmCC)

> 我们把 JavaScript 引擎在执行前的编译过程，程为**JS 的预编译**

**在 JS 的编译阶段，会做以下三件事 ？**

1、语法检查

- JS 引擎会检查你的代码有没有什么低级的**语法错误**，以消除一些歧义。
- 如果有语法错误，则不会往下执行，直接抛出“语法错误”。如以下代码：

```js
var a = 1;
console.log(a);
var b = 3； // b后面的; 分号是中文状态下的
// 代码并不会执行，打印出1，因为在预编译阶段有语法错误，所以直接抛出了误法错误
```

**2、创建执行上下文 （Execution context）**

- 执行上下文是 JavaScript 执行**一段代码**时所处的**运行环境**
- 关于执行上下文的相关细节，我们待会在下面详细讲解，这也是本章的重点。

**3、生成可执行代码**

JavaScript 引擎并不认识我们写的 JS 代码，所以需要将 JS 代码转换为计算机能读懂的机器码（二进制文件）

## 一、什么是执行上下文

- 执行上下文是 JavaScript 执行**一段代码**时所处的**运行环境**

> MDN 官网中提到：**作用域**是当前的执行上下文
>
> 参考地址：[https://developer.mozilla.org/zh-CN/docs/Glossary/Scope(opens new window)](https://developer.mozilla.org/zh-CN/docs/Glossary/Scope)

- 接下来我们就来明确下，哪些情况下代码才算是 **“一段”** 代码，才会在执行前进行预编译过程，并创建执行上下文环境。

> 主要有以下三种情况

![image-20221016204140956](https://www.arryblog.com/assets/img/image-20221016204140956.b4b2d36b.png)

### 1、全局执行上下文

- 当 JavaScript 执行全局作用域中的代码时，会编译全局代码并创建**全局执行上下文**
- 整个页面的生命周期内，全局执行上下文只有一份。
- 只有当整个页面关闭后，全局执行上下文才会被销毁。即页面没有关闭前，这些变量对应的数据都保存在内存中。

```js
// 代码在执行前，会预编译，并会创建全局执行上下文
// 以下代码在页面没有关闭前，是不会被销毁的，即当前数据还保存在内存中
var a = 1
var b = 2
function sum(a, b) {
  console.log(a + b)
}
```

### 2、函数执行上下文

- 当调用一个函数时，函数体内的代码会被编译，并创建**函数执行上下文**。
- 一般情况下，函数执行结束之后，创建的函数执行上下文就会被销毁。

```js
var a = 1
var b = 2
function sum(a, b) {
  var c = a
  var d = b
  console.log(c + d)
}
sum(2, 3) // 调用函数

// 代码执行前，会预编译，并创建全局执行上下文，然后从上往下执行代码
// 执行到sum(2,3)时，他调用函数，调用函数时会对函数体内代码预编译，同时创建函数执行上下文
// 执行函数体中代码，执行完后，函数执行上下文就会被销毁,即函数体内的变量c和d不再占据内存空间
```

> 以上代码创建了 全局执行上下文和 函数执行上下文

### 3、eval 执行上下文

- 在严格模式下，当使用 eval 函数时，eval 的代码会被编译，并创建**eval 执行上下文**。
- 考虑安全性能问题，现在 eval 被禁用

> `eval()` 函数可以接受一个字符串为参数，并将其中的内容视为好像在书写时就存在整个程序中这个位置的代码。
>
> eval 通常被用来执行动态创建的代码，但是安全风险过高，如果传过来的是一段 JS 木马呢 ？

```js
function foo() {
  eval('var a=1;var b=2;')
  console.log(a + b)
}
foo() // 在控制台输出 3
```

在严格模式下，`eval()`在运行时会有自己的执行上下文

```js
function foo() {
  'use strict'
  eval('var a=1;var b=2;')
  console.log(a + b) // 直接抛出错误 a is not defined
}
foo()
```

### 4、执行上下文分类

通过上面的学习，我们知道执行上下文主要分类以下三种：

- 全局执行上下文
- 函数执行上下文
- eval 执行上下文

![image-20221016205234225](https://www.arryblog.com/assets/img/image-20221016205234225.9b89d74c.png)

详细解读

- **全局执行上下文：** 当 JavaScript 执行全局作用域中的代码时，会编译全局代码并创建全局执行上下文
- **函数执行上下文：** 当调用一个函数时，函数体内的代码会被编译，并创建函数执行上下文
- **eval 执行上下文：** 当使用 eval 函数时，eval 的代码会被编译，并创建 eval 执行上下文

> 在深入学习执行上下文之前，我们还需要学习一个重要的知识：

**执行上下文栈** 学习这个知识将有助于我们理解 JavaScript 引擎背后的工作原理，以及对于我们理解执行上下文也有很大帮助。

## 二、执行上下文栈

首先我们要理解，什么是 **栈 LIFO** ？在算法那一章我们学习过栈这种数据结构，这里我们回顾下。

### 1、什么是栈

- **栈** 是一种先进后出的数据结构，要弄明白什么是栈，我们先举一个生活中的例子来帮助大家理解
- 假如你现在有一个长长的圆筒，圆筒的一端是封闭的，另一端是开口，现在往圆筒底部放气球，那先放的是不是在圆筒的底部，后放的是不是在靠近圆筒的位置。

> 如下图：

![stack](https://www.arryblog.com/assets/img/stack.b043979b.jpg)

详细解读：

我们现在要从圆筒中取出气球，那我们是不是得先取离圆筒出口最近的一个，即取球时的顺序正好和放的时候的顺序是反的。

我们把圆筒比喻从栈，那放气球的过程叫**入栈**，拿气球的过程叫**出栈**；圆筒的底部称为栈底，圆筒出口的第一个气球位置叫**栈顶**。

> **栈 LIFO ：** 是一种先进后出的一种数据结构。 插入一般称为入栈（PUSH），删除则称为出栈（POP）

### 2、什么是执行上下文栈（调用栈）

- 我们知道, 函数里面可以嵌套函数, 不同的函数调用又会形成不同的**执行上下文环境**
- 这些不同的执行上下文环境，我们统一放进一个**栈**中来管理。

> 我们把这种用来管理执行上下文的栈，称为**执行上下文栈**，又称**调用栈**

- **栈底**为全局执行上下文, 每当有一次函数调用, 形成的函数执行上下文就会被 push 进栈顶，即**压栈**
- 函数执行完, 该函数所对应的函数上下文将会被 pop 出上下文栈,即**出栈**

> 我们用下面这个代码来演示，整个**执行上下文栈的压栈和出栈过程**

```js
var a = 1
function fn1() {
  console.log('fn1')
  function fn2() {
    console.log('fn2')
  }
  fn2()
}
fn1()
```

![image-20221016211555201](https://www.arryblog.com/assets/img/image-20221016211555201.3a6146cf.png)

进栈

- 当页面打开，就会创建全局执行上下文，并将其压入执行上下文栈底。
- 然后执行全局上下文中代码，遇到`fn1()`调用，则会创建 fn1 的函数执行上下文, 压入执行上下文栈
- 然后执行 fn1 中代码，遇到`fn2()`调用，创建 fn2 的函数执行上下文,压入执行上下文栈。
- 接着执行 fn2 中的代码

![image-20221016212312883](https://www.arryblog.com/assets/img/image-20221016212312883.43d168c1.png)

出栈

- fn2 执行完毕后, 对应的执行上下文从执行上下文栈中 pop 出
- 此时 fn1 也被执行完，对应的执行上下文也从上下文栈中 pop 出
- 全局上下文要在浏览器关闭后才会被销毁

> 通过调试工具，来查看整个的压栈和出栈过程

![image-20221003200438404](https://www.arryblog.com/assets/img/image-20221003200438404.f6eb9e02.png)

### 3、栈溢出

- 执行上下文栈是用来管理执行上下文的数据结构，不过要注意的是 **执行上下文栈是有大小的**
- 当入栈的执行上下文**超过一定的数目**，栈对应的内存空间被占满后，JavaScript 引擎就会报错，我们把这种错误叫做**栈溢出**

> **递归代码，很容易出现栈溢出情况**，如下代码

```js
var i = 0
function a() {
  i++
}
a()
```

![image-20221016214415771](https://www.arryblog.com/assets/img/image-20221016214415771.d28dd851.png)

注：

不同的浏览为栈分配的内存空间大小是不—样的。
所以我们在使用递归时，要特别注意这一点，确保递归压栈时不会造成栈溢出。

> 修改上面代码，就不会出现栈溢出

```js
let i = 0
function a() {
  i++
  if (i < 13921) a()
}
a()
```

## 三、 执行上下文组成

执行上下文中包含了：

- 变量环境
- 词法环境
- 外部环境
- this

> 共四个部分

![image-20221003183701550](data:image/png;base64,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)

详细解读

- **变量环境：** 其实就是我们之前提到的变量和函数提升，在代码执行前变量和函数会被提升到当前作用域的最前面。
- **外部环境：** 其实就是我们之前了解的作用域链，他记录了当前作用域及他的外层作用域之间的关系，我们查找变量在当前作用域中找（当前变量环境中找）找不到再到外部外境（沿着作用域链去查找）
- **this：** 就是我们前面讲的 this，函数上下文对象，谁把函数当成方法来调用，this 就指向谁
- **词法环境：** ES6 中需要学习到的 let 和 const 声明的变量，是保存在词法环境中。

### 1、变量环境

- 在变量环境中存在一个**变量环境对象**（viriable Environment），叫**变量对象** 。英文全称 variable Object 简称 VO
- 在这个执行上下文中，所有由**var 声明的变量**和**函数**等都存在于这个 **“变量对象”** 上。
- JavaScript 代码不能直接访问该 **“变量对象”** ，但是可以直接访问该对象的成员。

> 接下来我们分别来学习以下三中**执行上下文中的变量对象**

![image-20221016215522508](https://www.arryblog.com/assets/img/image-20221016215522508.8a0bfd20.png)

### 1.1、全局执行上下文中 - 变量对象

- 全局上下文是最外层的上下文，全局执行上下文中的**变量对象**就是`window`**对象**
- 因此全局变量和全局函数都会成为 window 对象的**属性**和**方法**。
- 在`Node`环境中，全局执行环境是`global`对象
- 在全局上下文中， this 指向 windw 对象

> **注意：** JavaScript 中没法直接访问到 "变量对象" ，除全局上下文的变量对象 window

```js
var a = 1
function fn() {
  console.log(2)
}
console.log(this === window) // true 全局上下文中，this指向window
console.log(window.a) // 1  通过window对象的属性a可以访问到变量a
window.fn() // 2 通过window对象的方法fn可以访问到fn函数
```

### 1.2、函数上下文中 - 变量对象

- 在函数执行上下文中，变量对象常常被称为“**活动对象（Activation Object）简称 AO**” ，因为变量对象是在进入函数执行上下文时被创建的（被激活）的。
- 刚开始，活动对象上只有 arguments 这一个属性，其后函数中的变量、函数、参数都被保存在这个 **活动对象（AO）** 上，成为了这个活动对象的 **属性** 和 **方法**

> 我们直接访问函数中的变量，参数，函数，arguments，本质就是在访问 **"活动对象"** 上的属性。

```js
function sum(c) {
  var a = 2
  var b = 3
  console.log(arguments)
  console.log(a, b, c)
}
sum(1)

// 当前会创建全局执行上下文，然后执行到sum(1)时，会创建函数执行上下文
// 函数执行上下文中会创建一个活动对象，其内变量a,b和参数c，arguments都是活动对象的属性,包括 this
```

![image-20221016222358187](https://www.arryblog.com/assets/img/image-20221016222358187.5a1991cc.png)

> 在函数执行上下文中，this 对象保存在活动对象上的 this 属性上。

### 1.3、eval 执行上下文 - 变量对象

- 创建 eval 函数是为了将字符串转换为可执行的 JavaScript 代码。虽然看起来很强大，但不建议使用这个功能，因为我们无法控制它的权限。
- eval 函数的使用可能会使您的应用程序或服务受到注入攻击。 eval 函数接收到的字符串可能是恶意字符串，可以完全破坏您的数据库或应用程序。
- 这就是为什么不推荐使用 eval 函数的原因,也就不做介绍。

### 2、变量对象的创建过程

通过前面的学习我们知道，**变量对象（活动对象，简称 AO）** 是在 JS 预编译的过程中被创建的。

> 接下来我们来了解下变量对象的整个创建过程

### 2.1、变量对象创建的整个过程

我们以下面代码中的**函数执行上下文**中的**变量对象**为例，来看整个变量对象的创建过程

```js
function fn(a) {
  var b = 2 // 声明局部变量，并赋值2
  function num() {} // 声明局部函数
  var c = function () {} // 声明局部变量，并赋值为匿名函数
  b = 3 // 修改变量b的值为3
}
fn(1) // 调用函数，并传入实参 1
```

**第一步：创建空的变量对象**

全局执行上下文中代码执行到`fn(1)`时，函数被调用，就会创建函数执行上下文，同时创建空的变量对象

```js
// 1、创建 AO 变量对象
var AO = {} // 这里 AO 指代被创建出来的变量对象
```

**第二步：初始化变量对象的第一个属性 arguments**

```js
// 1、创建 AO 变量对象
AO = {
  // 2、创建arguments属性，其属性值为Arguments对象
  arguments: {
    0: 1, // 实参
    length: 1, // 实参个数
    // ..... 其它属性省略
  },
}
```

**第三步：处理形参与实参**

函数的所有形参的名称和实参对应组成的一个变量对象的属性被创建。如果没有实参，属性值设为 undefined。

```js
// 1、创建 AO 变量对象
AO = {
    // 2、创建arguments属性，其属性值为Arguments对象
    arguments: {
        0: 1, // 实参
        length: 1, // 实参个数
        // ..... 其它属性省略
    }，
    // 3、 寻找函数形参a，作为变量对象的属性，同时赋值为1
    a:1,
}
```

**第四步：处理函数体内的函数声明**

- 函数体内的函数声明的名称和对应值组成一个变量对象的属性被创建。
- 如果变量对象已经存在相同名称的属性，则会完全替换这个属性。

**重点提示：变量与函数提升**

- 上面这个过程，就是我们之前提到变量与函数提升
- 函数声明提升的优先级是高于变量提升，本质就是在变量对象初始化属性时，同名的方法会替换掉同名的属性。
- 如果是同名的函数，则以后面写在后面的为主。

```js
// 1、创建 AO 变量对象
AO = {
  // 2、创建arguments属性，其属性值为Arguments对象
  arguments: {
    0: 1, // 实参
    length: 1, // 实参个数
    // ..... 其它属性省略
  },
  // 3、寻找函数形参a，作为变量对象的属性，同时赋值为1
  a: 1,
  // 4、寻找函数声明 function num(){ }，将num为变量对象属性，值为函数本身
  num: function () {},
}
```

**第五步：处理函数体内的变量声明**

- 变量声明的名称和对应值（undefined）组成的一个变量对象的属性被创建。
- 如果变量名称与已经声明的**形参**或**函数名**相同，则变量声明不会覆盖已经存在的这类属性。

**重点提示：变量与函数提升**

- 变量对象的创建过程，就是我们之前提到的变量的提升，变量提升提升的是变量，并不会提升值，所以创建出来的属性，默认值是 undefined
- 同时同名的变量不会覆盖同名函数，同名的变量和变量本质覆盖与不覆盖没有区别。

```js
// 1、创建 AO 变量对象
AO = {
  // 2、创建arguments属性，其属性值为Arguments对象
  arguments: {
    0: 1, // 实参
    length: 1, // 实参个数
    //..... 其它属性省略
  },
  // 3、寻找函数形参a，作为变量对象的属性，同时赋值为1
  a: 1,
  // 4、寻找函数声明 function num(){ }，将num为变量对象属性，值为函数本身
  num: function () {},
  // 5、寻找var声明的变量，将变量b作为变量对象的属性，值为undefined
  b: undefined,
  c: undefined, // 6 寻找var声明的变量，将变量b作为变量对象的属性，值为undefined
}
```

> 通过控制台，查看整个变量对象的创建过程

![image-20221003205808364](https://www.arryblog.com/assets/img/image-20221003205808364.95ea0e1e.png)

### 2.2、代码执行阶段

代码进过预编译处理之后，就会开始**从上往下来执行代码**，执行代码时，就可能会修改变量对象的值。

```js
function fn(a) {
  var b = 2 // 声明局部变量，并赋值2
  function num() {} // 声明局部函数
  var c = function () {} // 声明局部变量，并赋值为匿名函数
  b = 3 // 修改变量b的值为3
}
fn(1) // 调用函数，并传入实参 1
```

- 第一步：修改变量对象上属性 b 的值为 2

```js
AO = {
  arguments: {
    0: 1,
    length: 1,
    // ..... 其它属性省略
  },
  a: 1,
  num: function num() {},
  b: 2, // 1、修改属性b的值
  c: undefined,
}
```

- 第二步：修改变量对象属性 c 的值

```js
AO = {
  arguments: {
    0: 1,
    length: 1,
    // ..... 其它属性省略
  },
  a: 1,
  num: function num() {},
  b: 2, // 1、修改属性b的值
  c: function () {},
}
```

- 第三步：再次修改变量对象属性 b 的值

```js
AO = {
  arguments: {
    0: 1,
    length: 1,
    // ..... 其它属性省略
  },
  a: 1,
  num: function num() {},
  b: 3, // 1、修改属性b的值
  c: function () {},
}
```

> 通过控制台，查看整个`fn()`函数执行完时，整个变量对象上的属性值

![image-20221003205908484](https://www.arryblog.com/assets/img/image-20221003205908484.a44e3218.png)

### 3、外部环境（outer)

- 其实，在 JS 中，每个函数都存在一个隐式属性`[[scopes]]`, 这个属性用来保存当前函数的**外部执行上下文**中的变量对象身上的**一些属性**, 由于在数据结构上是链式的, 也被称为作用域链。
- 只有当**内部执行上下文中引用了外部执行上下文中的变量**（AO 对象上的属性或方法）时，其外部执行上下文中变量对象的属性值才会被记录在个隐式属性`[[scopes]]`中,除全局执行上下文中的变量对象 window 外。

```js
var a = 1
function fn1() {
  var b = 2
  var c = 3
  var d = 4
  function fn2() {
    console.log(b)
  }
  fn2()
}
fn1()
```

![image-20221024172438524](https://www.arryblog.com/assets/img/image-20221024172438524.7fafd864.png)

重点提示：作用域链

- 外部环境本质就是我们之前提到的作用域链，外部环境中记录了外部执行上下文中变量对象身上的一些属性和方法。
- 当我们在变量查找时，如果当前执行上下文的变量对象上找不到，则会去当前执行上下文的外部上下文的 **“变量对象”**（**其是实闭包对象**）上去查找。
- 如果找到就用，找不到就会一直找到全局执行上下文的变量对象 window 身上。还找不到，就会报错。

### 3.1、变量查找过程

我们通过下面这个代码来分析，整个变量的查找过程

```js
var a = 1
function fn1() {
  var b = 2
  var c = 3
  var d = 4
  function fn2() {
    var e = 5
    console.log(e + b + a)
  }
  fn2()
}
fn1()
```

**第一步：创建全局执行上下文**

![image-20221016230245841](https://www.arryblog.com/assets/img/image-20221016230245841.59507d9c.png)

**第二步：执行全局上下文中的代码**

- 从上往下执行代码，首先变量 a 赋值为 1
- 同时遇到`fn1()`，调用`fn1()`函数，**创建函数执行上下文，并压入执行上下文栈**

![image-20221016233504445](https://www.arryblog.com/assets/img/image-20221016233504445.fa6016e9.png)

**第三步：执行 fn1 函数上下文中的代码**

- 首先给变量赋值 `b=2`，`c=3`，`d=4`，`fn1 = function(){....}`
- 同时遇到`fn2()`，调用`fn2()`函数，**创建函数执行上下文，并压入执行上下文栈**

![image-20221016233557565](https://www.arryblog.com/assets/img/image-20221016233557565.1cc10b57.png)

**第四步：执行 fn2 函数执行上下文中的代码**

- 首先给变量 e 赋值，`e=5`
- 然后执行 `console.log(e+b+a);`代码
- 首先在当前作用域（执行上下文）中的词法环境中找变量 e，没有找到，再到变量环境的变量对象上找 e，找到`e=5`，并使用
- 然后在当前作用域中的词法环境中去找变量 b，没有找到，则到变量环境中的变量对象上找变量 b，没有找到，则沿着外部环境去其外层的作用域中去查找。
- 在外层作用域中查找时，也是先到词法环境中找，找不到再到变量环境中找，再找不到就再到其外部环境中去找，一层一层找，找到就用，找不到一直找到全局作用域中，还没找到，就报错。

**变量 e，b，a 的查找流程图如下**

![image-20221016235829339](https://www.arryblog.com/assets/img/image-20221016235829339.718d28dc.png)

**第五步：fn2 执行完，开始出栈**

![image-20221017000327368](https://www.arryblog.com/assets/img/image-20221017000327368.b8dfcd98.png)

**第六步：fn1 执行完，开始出栈**

![image-20221017000404813](https://www.arryblog.com/assets/img/image-20221017000404813.20b1ff15.png)

> 全局执行上下文要等整个页面关闭后才会被销毁，才会弹栈。

### 3.2、控制台演示

通过控制台，查看整个执行上下文创建，压栈，变量查找，弹栈的整个过程

![image-20221017000055945](https://www.arryblog.com/assets/img/image-20221017000055945.4d50a04b.png)

详细解读

- 只有内部函数引用了外部函数中的部分变量，部分变量才会被保存在函数的`[[scopes]]`属性中
- 内部函数在变量查找时，在自己作用域中找，找不到再到`[[scopes]]`属性中一层一层向下找
- `[[scopes]]`属性中，本质记录的是全局作用域的变量对象 window 和每一次内部形成的闭包对象

```js
var a = 1
function fn1() {
  var b = 2
  var c = 3
  var d = 4
  function fn2() {
    var e = 5
    console.log(e + b + a)
    function fn3() {
      console.log(e, c)
    }
    fn3()
  }
  fn2()
}
fn1()
```

![image-20221017001612732](https://www.arryblog.com/assets/img/image-20221017001612732.67b08432.png)

> 关于闭包，在接下来就会讲到，往下看

### 4、词法环境

ES6 中利用 let 和 const 声明的变量，会放在词法环境中。
在变量查找时，首先会在词法环境中去查找，如果找不到，再到变量环境中查找。

```js
var a = 1
let b = 2
const c = 3
console.log(a + b + c)
```

![image-20221017002500564](https://www.arryblog.com/assets/img/image-20221017002500564.1c0430f9.png)

### 5、this 函数上下文

- 在函数中，其内部`this`指向把函数当成方法调用的**上下文对象**
- 这个之前详细讲过，在此略过不讲。大家可以参考下面的表格自己复习下

| 函数的调用方式          | this 指向          |
| :---------------------- | :----------------- |
| `对象.函数()`           | 对象               |
| `函数()`                | window             |
| IIFE 立即执行函数       | window             |
| `数组[下标]()`          | 数组               |
| `call(对象,arg1,arg2)`  | 对象               |
| `apply(对象，array)`    | 对象               |
| `bind(对象，arg1,arg2)` | 对象               |
| 定时器中的回调函数      | window             |
| DOM 事件处理函数        | 添加事件监听的元素 |
| `new 函数()`            | 对象的实例         |

## 四、闭包

至于 **什么是闭包 ？** 我们暂且先放下，我们通过两个案例来理解，什么是闭包，什么情况下会形成闭包。

### 1、形成闭包的条件

- 内部函数访问外部函数的变量时，其内部就会形成闭包。
- 但这种方式，并不能保持闭包，因为函数执行完就被销毁了，其闭包对象也被销毁。

> 下面这段代码，就会形成闭包

```js
function fn() {
  var a = 1
  var b = 2
  function fn2() {
    // 内部函数访问了外部函数中的变量，这里候就形成了闭包，
    console.log(a)
  }
  fn2()
}
fn()
```

![image-20221003222528230](https://www.arryblog.com/assets/img/image-20221003222528230.8a6c5fc7.png)

闭包形成过程

- 当调用`fn()`函数时，其内部的`fn2`函数引用了`fn`函数中的变量`a`，这时`fn`函数就会形成闭包。
- 他内部创建了一个新对象，把**内部函数用到的变量**`a`和对应的值成为了这个新对象的属性和值，这个新对象就是我们说的闭包`Closure`

**闭包带来的便利-方便变量查找**

- 当`fn2()`函数调用时，就会访问变量`a`，他首先会在自己作用域（执行上下文）中找，找不到
- 然后就在闭包对象中去查找，找到中了变量`a`。最终在控制台输入 1
- 假设没有闭包对象，那他要去外层作用域中找，外层作用域中如果有 100 个就变量，那要从 100 个变量中找到一个方便 ，还是把用到的那一个存好，直接拿来用方便呢？肯定是后者。

**闭包销毁**

- 最后`fn2`执行完就销毁，其对应的闭包也就随着销毁
- 所以这种情况下会形成闭包，但闭包不能被保持。所以我们很多时候讨论的闭包并不是这种情况。

> 但内部函数能快速访问到外部函数作用域中的变量，本质就是因为形成了闭包。

### 2、形成闭包的条件

- 内部函数使用了外部函数的**变量**，同时被返回到了外部函数的外面，这时就会形成闭包
- 主要表现在于，在外部执行被返回的函数时，可以访问他在定义时所处环境中的变量
- 这种情况才是真正意义上的形成了闭包，因为闭包被保持下来，供后期使用

```js
function fn() {
  var a = 1
  var b = 2
  function fn2() {
    console.log(a)
  }
  return fn2
}
var fn3 = fn() // 被赋值
fn3()
```

![image-20221026181215538](https://www.arryblog.com/assets/img/image-20221026181215538.3f1e8739.png)

闭包形成过程

- 当代码执行到`fn3=fn()`时，`fn()`被调用了，因为`fn2`函数引用了`fn`函数中的变量`a`，这时`fn`函数就会形成闭包
- 他内部创建了一个新对象，把**内部函数用到的变量**a 和对应的值成为了这个新对象的属性和值，这个新对象就是我们说的闭包（`Closure`）

**闭包是如何保持的**

- 然后 fn2 函数的隐式属性`[[Scopes]]`数组中，多了一个新的对象，这个对象指向上面 fn 创建出来的闭包。
- 然后`fn2`被当成返回值，返回给到了变量`fn3`。
- `fn()`函数执行完，就被销毁了，但是他创建的闭包并没有销毁，一直存在内存中
- 因为`fn3`在何时调用，调用多少次这个说不定，只要 fn3 被调用，就会执行 fn2 中的代码，就会访问变量 a,所以 fn 函数形成的闭包并不会随着 fn 函数的销毁而被销毁，而是一直存在于内存中。

**闭包带来的便 利-函数体外可以访问函数内部的变量**

- 只要我们执行`fn3`，就相当于执行`fn2`中的代码，就会访问变量`a`，他在当前`fn2`的作用域中找不到，就会去他的隐式属性`[[Scopes]]`即作用链中去查找，因为之间有闭包存在，所以他会先在闭包中找。找到了`a`，就打印出来。

### 3、总结闭包形成的两种情况

情况一：

当内部函数访问了外部函数的变量时，就会形成闭包，但这种情况下闭包不能保持，内部函数执行完，闭包就销毁了。

**情况二**：

内部函数使用了外部函数的**变量**，同时被返回到了外部函数的外面，这时就会形成闭包。这种情况下闭包能被保持，一直在保存在内存中。被返回到外部的函数，不管何时执行，执行多少次，都可以访问到他在定义时所在作用域中的变量。

我们通常说说的闭包，指的是第二种情况下形成的闭包，因为第一种情况没有办法保持。

> 接下来我们来看下闭包的定义

### 4、什么是闭包

- **闭包**（closure）是一个函数以及其捆绑的周边环境状态（**lexical environment**，**词法环境**）的引用的组合。
- 换而言之，闭包让开发者可以从**内部函数访问外部函数的作用域**。
- 在 JavaScript 中，闭包会随着函数的创建而被同时创建。

> 以上定义来自 [MDN 官方文档(opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

![image-20211224231948096](https://www.arryblog.com/assets/img/image-20211224231948096-16668023196481.0fa606a7.png)

闭包

可以理解为是函数的一种性质，他能记住他在声明时所处的环境状态。
那么不管后来函数在什么第方被调用，他都能访问他在定义时所处作用域中的变量。

### 5、闭包与作用域链的关系

- 每个函数身上都有一个`[[Scopes]]`属性， 这个属性用来保存当前函数所有用到的闭包对象和全局执行上下文对象。
- 当内部函数引用了外部函数中的变量时，就会形成闭包，这个闭包对象中保存了内部函数引用外部函数中的**那些变量**。 当前函数身上的`[[Scopes]]`属性中，保持了对这个闭包对象的引用。
- 作用域链查找，本质就是先在当前作用域中找，如果找不到，就会去函数的`[[Scopes]]`属性中保存的闭包对象和全局对象中去找。

### 6、闭包的用途

闭包有两大特性：记忆性、模拟私有变量

- **记忆性：** 当闭包产生时，函数所处环境的状态会始终保持在内存中，不会在外层函数调用后被自动清除，这就是闭包的记忆性。
- **模拟私有变量：** 我们可以把一些不需要的全局变量封装成 ”私有变量“。

### 6.1、闭包记忆性案例

创建提问检测函数 `checkTemp(n)`，可以检查体温 n 是否正常，函数会被返回布尔值，体温正常会返回`true`，体温不正常会返回`false`

> 但，不同的小区有不同的体温检测标准：

比如：A 小区体温合格线是 `37.1 ℃`，而 B 小区体温合格线是`37.5 ℃`，应该怎样编程呢 ？

```js
// 闭包的记忆性（同时这样的函数也叫：高阶函数或偏函数，未来会学习）
function createCheckTemp(standardTemp) {
  function checkTemp(n) {
    if (n <= standardTemp) {
      console.log('你的体温正常')
    } else {
      console.log('你的体温偏高')
    }
  }
  return checkTemp
}

// 创建一个checkTemp函数，它以37.3度为标准线
var checkTemp_A = createCheckTemp(37.3)
// 再创建一个checkTemp函数，它以37.0度为标准线
var checkTemp_B = createCheckTemp(37.0)

checkTemp_A(37.1) // 你的体温正常
checkTemp_A(37.8) // 你的体温偏高

checkTemp_B(36.5) // 你的体温正常
checkTemp_B(37.1) // 你的体温偏高
```

> 闭包记忆性案例：查询你的工资是否高于本城市的平均工资

```js
function checkSalary(salary) {
  function check(mySalary) {
    if (mySalary >= salary) {
      alert('你的工资高于平均工资')
    } else {
      alert('你的工资代于平均工资')
    }
  }
  return check
}
var citySalary = checkSalary(10000)
citySalary(8000)
var citySalary2 = checkSalary(7000)
citySalary2(8000)
```

### 6.2、模拟私有变量

题目：

请定义一个变量 a，要求是能保证这个 a 只能被进行指定操作（如：加 1、乘 2），而不能进行其他操作，应该怎么编程呢 ？

> 在 Java、C++等语言中，有私有属性的概念，但是 JavaScript 中只能用闭包来模拟。

```js
// 封装一个函数，这个函数的功能就是私有化变量
function fun() {
  // 定义一个局部变量 a
  var a = 0

  return {
    getA: function () {
      return a
    },
    add: function () {
      a++
    },
    pow: function () {
      a *= 2
    },
  }
}

var obj = fun()
// 如果想在fun函数外边使用变量a，唯一的方法就是调用getA()方法
console.log(obj.getA()) // 0
// 如果需要变量+1只能调用add方法
obj.add()
obj.add()
obj.add()
console.log(obj.getA()) // 3
obj.pow()
obj.pow()
obj.pow()
console.log(obj.getA()) // 24
```

## 五、垃圾回收 GC

深入浅出垃圾回收，JavaScript 中垃圾回收的策略，闭包与内存管理等。

### 1、什么是垃圾回收（Garbage Collection）？

- 在现实生活中，所谓的垃圾，就是指用过了，不会再用的东西，就可以当成垃圾被处理掉。
- 在 JS 中，所谓的垃圾，你可以理解为那些不会再被使用的数据，就会被当成垃圾回收掉
- JavaScript 中 JS 引擎会自动回收不再使用的变量，释放其所占的内存，开发人员不需要手动的做垃圾回收的处理。

> 但最艰难的任务是找到那些变量将不会再使用，释放其“占用的内存”

**我们来看下面几个例子，分析下，其中的变量否会被当成垃圾回收掉**

- 下面代码执行完后，其变量 a 和 obj 还会占用内存空间吗？

```js
function fn() {
  var a = 1
  console.log(a)
  var obj = {
    name: '张三',
    age: 23,
  }
  console.log(obj)
}
fn() // 执行函数

// 上面fn()函数执完后，变量中的a 和obj就会被销毁掉，不会再占用内存的空间了。
// 当然垃圾回收，并不会立刻马上就回收，他可以马上，也可以会等一会儿，但时间不会太久
// 函数执行完，里面的数据都不会再被其它对象引用，也就会当成垃圾被处理掉
```

- 下面代码执行完后，其变量 a 和 obj 还会占用内存吗 ？

```js
function fn() {
  var a = 1
  var obj = {
    name: '张三',
    age: 23,
  }
  window.a = a
  window.obj = obj
}
fn() // 执行函数
// fn()函数执行后，变量a和obj被赋值给了window对象的属性，也就是全局对象window保持了对变量a和obj的引用。说不定什么时候我们就可以需要用到window.a和window.obj
// 所以这种情况下 变量a被销毁，但是window.a上的a属性和obj中的引用对象并不会被销毁
// 但这里的obj和window.a并不是垃圾，因为我们在后面还需要用到他。
// 以上变量占用内存，是符合用户预期的
```

- 下面代码执行完后，a 和 b 还会占用内存吗 ？

```js
function fn() {
  var a = 1
  var b = 2
  function sum() {
    console.log(a + b)
  }
  return sum
}
var s = fn() // 调用函数
s() // 调用函数

// 上面代码执行完后，a，b并不会被销毁会，因为形成了闭包，我们不知道什么进候，我们还会调用s();
// 如果我们把变量a,b销毁了的话，那我们后面如果要调用s()，那不就会报错吗？
// 这种情况下闭包就会造成变量不能被销毁，一直占用内存。那这算是内存泄露吗？
// 这种情况，我们是有意想要形成闭包，人为的希望局部变量a和b能一直保存在内存中，所以不能算内存泄露。
```

总结：

- 如果某些数据我们未来还有可能会用到，那么他一直占用内存是符合用户期望的，并不能算垃圾，所以也不能当成垃圾回收掉。
- 只有那些被执行完，未来不可能再用到的数据，就是垃圾，就可以当成垃圾被回收掉。

> 那 JS 是如何判断那些数据未来永远都不可能用到呢 ？然后把他当成垃圾回收掉呢 ？

### 2、JS 中垃圾回收的两种策略

垃圾回收主要有两种策略，**标记清理**和**引用计数**。

**引用计数**

- 引用计数其实是一种比较老的垃圾回收策略
- 引用计数就是追踪**值**被引用的次数。
- 声明变量并给它赋一个引用类型值时，这个值的引用数为 1，如果同一个值又被赋给另一个变量，那引用数+1
- 如果保存该值引用的变量被其它值覆盖了，则引用数减 1
- 当引用计数为 0 时，表示这个值不再用到，垃圾收集器就会回收他所占用的内存。

```js
var a = [1, 2, 3] // [1,2,3]的引用计数为1
var b = a // 变量b也引用了这个数组，所以[1,2,3]的引用数为2
var a = null // [1,2,3]的引用被切断，引用数-1，所以[1,2,3]的引用数为1
// 如果只是到这里，那[1,2,3]不所占的内存不会被回收
var b = null // [1,2,3] 的引用被切断，引用数-1，所 [1,2,3]的引用数为0
// 到这里，垃圾收集器在下一次清理内存时，就会把[1,2,3]所占的内存清理掉
```

> 引用计数有一个很大的坑，就是循环引用时，会造成内存永远无法释放。

```js
function fn() {
  var obj1 = {}
  var obj2 = {}
  obj1.a = obj2
  obj2.a = obj1
}
fn()
// 这种情况下，fn函数执行完后，其内部的obj1和obj2已经没有用了，可以被回收了。
// 但引用计数统计到他们引用数>0,则 obj1和obj2就没有办法被清理了，因为引用数永远不可能为0
```

![image-20221026193122906](https://www.arryblog.com/assets/img/image-20221026193122906.f785978d.png)

> fn 执行上下文在代码执行完后，就出栈，意味着 obj1 与 obj2 被销毁，不会再有指向堆内存中的引用
>
> 但是堆内存中的数据，自己指向自己是有引用的，所以永远都不会被销毁

标记清理

- 这个算法假定设置一个叫做根（root）的对象（在 JavaScript 里，根是全局对象 window）
- 垃圾回收器将定期从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……
- 从根开始，垃圾回收器将找到所有可以获得的对象和收集所有不能获得的对象。
- 那些无法从根对象查询到的对象都将被清除

如果用标记清理的方式来处理垃圾回收，则就不会出现上面循环引用的问题，造成垃圾不能回收了

因为函数调用之后，两个对象 obj1 和 obj2 都无法从全局对象出发获取。因些，他们将会被垃圾回收器回收掉。

> 从 2012 年起，所有现代浏览器都使用了标记 - 清除垃圾回收算法

### 3、手动标记垃圾

- 通过上面两种垃圾加收的策略，我们知道，在全局作用域中的变量永远都可以从全局对象上获取到。所以永远不会自动回收。
- 所以我们在写代码时，尽量要避免不要把一些变量设置为全局变量，如果实在要设为全局变量，那我们使用完后不再需要，那我们就需要手动将其标注为垃圾，让垃圾回收器回收掉。
- 手动标记垃圾的方式，本质就是切断引用，常用的方式就是把变量的值重新赋值为 null

```js
var obj = {
  name: '张三',
  age: 23,
}
// 标记为垃圾，垃圾回收器就会自动回收掉内存中的 { name:'张三',age:23} 这个对象占用的空间
obj = null
```

### 4、总结

所谓的垃圾可以理解为，非用户预期的内占存用，那么这些占用内存的数据就可以理解为垃圾，应该回收掉。如果是用户预期的内存占用，那都不能算是垃圾。

如果有些变量我们不再需要，而垃圾回收器无法识别，那我们就可以手动将其标记为垃圾。即把变量的值起来 null

### 5、闭包与内存管理

我们经常听说闭包会造成内存泄露，所谓**内存泄漏**是指程序中已动态分配的内存由于某种原因未释放或无法释放

> **那闭包会造成内存泄露吗 ？** 我们来看下这段代码：

```js
// 设置当地的一个参考分数线，然后输入你的分数，查看是否超过分数线
function compare(score1) {
  return function (score) {
    if (score1 > score) return '分数线过底不达标'
    return '恭喜，分数线超过一本'
  }
}
// 北京1本录取分数线
var fn = compare(530)
// 小明的分数是540
console.log(fn(540))
// 小线分数
console.log(fn(480))
```

代码解读

- 上面代码中的 score1 变量在页面没有关闭前，永远都不会被销毁
- 因为内部函数作为返回值被返回，同时内部函数引用了变量 score1，所以就形成了闭包。闭包对象中包含了属性 score1，
- 但是，我们使用闭包，本质也是为了用他的这个特性，希望局部变量能被保存在内存中，不要销毁。如果从这个角度来看，闭包并不能说会造成内存泄露。

> 本质上闭包是有意的将变量保存在内存中，是用户预期的内存占用，所以不能算是内存泄露。

如果因为不小心误用了闭包，而造成某些数据一直占用内存而不能被回收，那就可以理解为因为误用闭包而造成的内存泄露。因为闭包中的数据，肯定是不能被垃圾加收的。

总结：

不能滥用闭包，否则会造成网页的性能问题，严重时可能会导致内存泄漏

> 关于如何检测内存泄露和在实际中那些情况会存在内存泄露，在后续的课程中再讲。

### 6、区分内存泄露和内存溢出

- **内存泄露：** 是指程序在申请内存后，无法释放已申请的内存空间，一次内存泄露危害可以忽略，但内存泄露堆积后果很严重，无论多少内存，迟早会被占光。
- **内存溢出：** 是指程序在申请内存时，没有足够的内存空间供其使用，内存不足。

## 六、IIFE 立即执行函数

接下来我们学习一种特殊的方式来调用函数，那就是 IIFE 立即执行函数

### 1、什么是 IIFE 立即执行函数?

- IIFE （Immediately Invoked Function Expression）（**立即调用的函数表达式**）
- 是一种特殊的 JavaScript 函数写法，**一旦被定义，就立即被调用**

**语法：**

声明一个匿名函数，也就是没有名字的函数，然后用`()`把匿名函数转为 **“函数表达式”**，然后再调用

```js
// 写法一
;(function () {
  // 函数体语句
})()

// 写法二
;(function () {
  // 函数体语句
})()
;(function () {
  console.log('立即执行函数')
})()

;(function () {
  console.log('立即执行函数')
})()
```

温馨提示：

我们之前说，直接用 function 声明的函数称为函数声明，那这里为什么称为函数表达式呢 ？

是因为`()`括的功能，他将函数变为了表达式，然后`()`括号后面的`()`括号，表示执行函数

```js
// 以下是错误写法
// 函数不能直接加圆括号被调用
function(){
    // 函数体语句
}();
```

### 2、形成 IIFE 的其它方法

- 除了用`()`包裹函数声明，将函数声明转为“函数表达式”之外
- 我们还可以在函数声明前添加 - 或 +号，来将函数声明转为“函数表达式”，然后再调用

```js
;(function () {
  // 函数体语句
})()

;+(function () {
  // 函数体语句
})()

;-(function () {
  // 函数体语句
})()
;+(function () {
  console.log('我被调用直接执行')
})()

;-(function () {
  console.log('我被调用直接执行')
})()
```

### 3、IIFE 的作用 - 为变量赋值

- 当我们给变量赋值时，其值需要一些较为复杂的计算才能得到，这时候就可以用立即执行函数来实现
- 使用 IIFE 显得语法更紧凑

```js
// 获取一个随机颜色
var color = (function () {
  var arr = ['red', 'pink', 'skyblue', 'khaki']
  var i = (Math.random() * arr.length) >> 0
  return arr[i]
})()
console.log(color)
```

> 以上写法，函数不会被其它对象引用，也不能在其它地方被执行。
>
> 如果你的某个函数只是为了一次求值，其它地方也不会再使用他，则可以用 IIFE 来实现。

```js
var age = 22
var sex = '男'
// 获取身份 定义IIFE立即执行函数来实现
var status = (function () {
  if (age < 18) {
    return '小朋友'
  } else {
    if (sex == '男') {
      return '先生'
    } else {
      return '女士'
    }
  }
})()

console.log(title) // 先生
```

### 4、IIFE 的作用 - 将全局变量变为局部变量

在很多情况下，我们希望将全局变量转为局部变量保存起来。

> 我们来看下面几个情况

```js
var arr = []
for (var i = 0; i <= 5; i++) {
  arr.push(function () {
    console.log(i)
  })
}
arr[0]() // 6
arr[1]() // 6
arr[2]() // 6
arr[3]() // 6
arr[4]() // 6
var arr = []
for (var i = 0; i <= 5; i++) {
  // IIFE  本质是，在每一次循环，形成了一次闭包
  ;(function (i) {
    arr.push(function () {
      console.log(i)
    })
  })(i)
}
arr[0]() //0
arr[1]() //1
arr[2]() //2
arr[3]() //3
arr[4]() //4
```

### 5、arguments.callee

arguments 对象身上有一个 callee 属性，是指向 arguments 对象所在函数的指针。

> 通过`arguments.callee`能获取到 arguments 对象所在的函数。`arguments.callee`**已经被弃用**，不应该再使用了，这里只当了解。

```js
function sum() {
  console.log(arguments.callee)
}
sum()

// 求一个数的阶乘
function factorial(n) {
  if (n == 1) return 1
  return n * arguments.callee(n - 1)
}
console.log(factorial(5))
```

arguments.callee 的作用

当我们需要在一个匿名函数内部，调用这个函数自身时，他就非常有用了

```js
// 输入5的阶乘
var n = (function (n) {
  if (n == 1) return 1
  return n * arguments.callee(n - 1)
})(5)
console.log(n)
```

> 通常在递归调用匿名函数时，就可以用`argument.callee`来找到匿名函数
