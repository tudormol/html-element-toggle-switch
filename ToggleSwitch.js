
/*
    Toggle switch with two (or more) options.

    Use as:

    HTML:

    <toggle-switch class="toggle" data-values="answer|source|other" data-value="answer"></toggle-switch>

    JS:   - no js needed to init

    1. Listen to the change event to get component value changes:

    document.querySelector('.toggle').addEventListener('change', function (e){
        console.log('CHANGE new val:', e.detail.value)
    })

    2. Listen to the clicked (NOT click) event to get an change, including clicking / updating the active one:

    document.querySelector('.toggle').addEventListener('clicked', function (e){
        console.log('CLICK ANY new val:', e.detail)
    })

*/

class ToggleSwitch extends HTMLElement {

    connectedCallback () {

        var t = this
        var html = ''
        var cls  = ''

        if (typeof t.dataset.values !== 'string' || t.dataset.values === '') {
            console.error('data-values is missing. Cannot init ToggleSwitch component.')
            return
        }

        if (typeof t.dataset.value !== 'string' || t.dataset.value === '') {
            console.error('data-value is missing. Cannot init ToggleSwitch component.')
            return
        }

        if (t.dataset.values.split('|').indexOf(t.dataset.value) === -1) {
            console.error('data-value is not one of data-values. Cannot init ToggleSwitch component.')
            return
        }

        t.dataset.values.split('|').forEach(element => {
            if (element === t.dataset.value.trim()) {
                cls = 'active'
            } else {
                cls = ''
            }
            html += '<span class="' + cls + '">' + element + '</span>'
        })

        t.innerHTML = html

        t.dataset.values = ''
  
        t.addEventListener('click', t._toggle)
    }

    attributeChangedCallback (name, oldValue, newValue) {

        var t = this

        if (oldValue !== newValue) {
            t.dispatchEvent(
                new CustomEvent("change", {
                    bubbles: true,
                    detail: { value: t.dataset.value }
                })
            )
        }
        
        t.dispatchEvent(
            new CustomEvent("clicked", {
                bubbles: true,
                detail: { value: newValue, clickedActive : (oldValue === newValue) }
            })
        )

        t._updateUI(t.dataset.value)
        
    }

    
    static get observedAttributes() {
        return ['data-value']
    }


    _toggle (e) {
        
        var t = this

        if (e.target.tagName.toLowerCase() === 'span') {
            
            var val = e.target.innerHTML.trim().toLowerCase()
            var clickedActive = e.target.classList.contains('active')

            t.dataset.value = val

            if (!clickedActive) {
                t._updateUI(val)
            }
        }
    }

    _updateUI (val) {

        var t = this

        // first remove the old active
        var currentEl = t.querySelector('.active')

        if (currentEl !== null) {
            currentEl.classList.remove('active')
        }

        t.querySelectorAll('span').forEach(element => {
            var elVal = element.innerHTML.trim().toLowerCase()
            if (elVal === val) {
                element.classList.add('active')
            }
        })

    }
}

customElements.define('toggle-switch', ToggleSwitch)