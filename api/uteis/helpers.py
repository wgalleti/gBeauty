def choice_to_list(choice):
    """
    Convert a choice into list
    """
    return [dict(id=s[0], name=s[1].title()) for s in choice]
