using Microsoft.Web.WebView2.Core;
using System.Windows;

namespace SDStock
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            await webView2.EnsureCoreWebView2Async(null);
            webView2.CoreWebView2.SetVirtualHostNameToFolderMapping("appassets.example", "assets", CoreWebView2HostResourceAccessKind.Allow);
            webView2.CoreWebView2.Navigate("https://appassets.example/index.html");
        }
    }
}
