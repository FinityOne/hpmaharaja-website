from django import template

register = template.Library()

@register.filter
def article_image_src(image_path):
    """
    If the image starts with http/https, treat as external URL.
    Otherwise treat it as a static file path.
    """
    if image_path.startswith("http://") or image_path.startswith("https://"):
        return image_path
    return f"/static/{image_path}"
