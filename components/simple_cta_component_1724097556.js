/* Summary: This component contains a h2 heading title for the CTA, a line of text under it, and a button underneath it. They are all centre aligned.
*/
Vue.component("simple_cta_component_1724097556", {
    template: `
    <section id="cta-component" class="bg-gradient-to-br from-purple-900 to-pink-600 flex-1 py-16">
        <div id="cta-inner-container" class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div id="cta-content" class="max-w-screen-sm mx-auto text-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8">
                <div id="cta-title-container" class="flex">
                    <h2 id="cta-title" class="flex-1 mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white">Cosmic Thrones: Your Galactic Seat Awaits</h2>
                </div>

                <div id="cta-subtitle-container" class="flex">
                    <p id="cta-subtitle" class="flex-1 mb-6 font-light text-pink-200 md:text-lg">Discover the perfect interstellar toilet for your cosmic kingdom</p>
                </div>
                
                <div id="cta-button-container" class="flex">
                    <a id="cta-button" href="#" class="flex-1 text-purple-900 bg-pink-300 hover:bg-pink-400 focus:ring-4 focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition duration-300 ease-in-out transform hover:scale-105">
                        <i class='bx bx-rocket mr-2'></i>Launch Your Throne Journey
                    </a>
                </div>
            </div>
        </div>
    </section>
        `,
    data() {
        return {
            expanded: false,
            tab: null,
        };
    },
});
