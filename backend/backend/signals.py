from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.core.mail import send_mail  
from django_rest_passwordreset.signals import reset_password_token_created
import os

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    if os.environ['EA_MODE'] == 'dev':
        url = "localhost:3000"
    else:
        url = "sep22.forever.dev"

    email_plaintext_message = url + "/changePassword#{}".format(reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Ethics Adventure"),
        # message:
        email_plaintext_message,
        # from:
        "noreplyEthicsAdventure@gmail.com",
        # to:
        [reset_password_token.user.email]
    )