# html-element-toggle-switch
A ToggleSwitch HTMLElement Component

Toggle switch with two (or more) options.

![toggle switch](http://tudormoldovan.eu/git-assets/toggle.png)

Use as:

HTML:

&lt;toggle-switch class="toggle" data-values="answer|source|other" data-value="answer"></toggle-switch&gt;

JS:
- no js needed to init

1. Listen to the change event to get component value changes:

<code>
document.querySelector('.toggle').addEventListener('change', function (e){
    console.log('changed, new value:', e.detail.value)
})
</code>

2. Listen to the clicked (NOT click) event to get an change, including clicking / updating the active one:

<code>
document.querySelector('.toggle').addEventListener('clicked', function (e){
    console.log('clicked on:', e.detail)
})
</code>
